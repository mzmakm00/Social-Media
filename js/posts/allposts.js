import fetchUser from "../main/fetchUsers.js";
import CommentImages from "./postcomments.js";
import CommentEditor from "../crud_comments/editcoment.js";
import  Postfetch  from "./searchpost.js";
import PostRenderer from "./posthtml.js";
import UserContainerHandler from "./showingUser.js";



class Allposts {
    constructor() {
        this.skip = 0;                   // Initialize a property to keep track of how many posts to skip, starting with 0.
        this.totalPosts = 0;             // Initialize a property to keep track of the total number of posts, starting with 0.
    
        this.setupScrollListener();       // Call a method to set up a scroll listener for fetching more posts when reaching the bottom of the page.
        this.setupCommentIconClickListener();  // Call a method to set up a click listener for comment icons.
        this.setupEditButtonClickListener();    // Call a method to set up a click listener for edit buttons.
        this.setupSearchInputListener();         // Call a method to set up a listener for search input changes.
    }
    

    // Fetch posts from the server and append them to the DOM
    async fetchAndAppendPosts() {
        try {
            if (this.totalPosts <= 10) {
                const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${this.skip}&select=title,reactions,userId,tags,body`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();         // Asynchronously storing the data which is coming from API 
                const posts = data.posts;                   // getting the main post from response 
                const card = document.getElementById('posts');

                // for getting comment on each post
                for (const post of posts) {
                    // fetching every user who's post is showing
                    const userData = await fetchUser.fetchUserData(post.userId);

                    // Use comments API for showing comments
                    const commentsResponse = await fetch(`https://dummyjson.com/comments/post/${post.id}`);
                    if (!commentsResponse.ok) {
                        throw new Error('Failed to fetch comments for post ' + post.id);
                    }
                   // getting response from comments API
                    const commentsData = await commentsResponse.json();
                    const comments = commentsData.comments;
                    const tags = post.tags;
                    const hashtagsHTML = tags.map(tag => `#${tag}`).join(' ');
                    
                    // showing the duynamically userData againsts with its post along with its comments and hashtag
                    let postHTML = PostRenderer.postHtml(userData,post,hashtagsHTML);
                     
                    // adding that dynamically data in the card html
                    card.innerHTML += postHTML;
                    
                    // this class is for getting the userID and showing his posts
                    new UserContainerHandler(card)

                const postContainer = card.lastElementChild.querySelector('.comments-container');

                CommentImages.loadCommentsWithImages(comments, postContainer);
            }   
            // As skip is 0 so for next 10 post showing it will be 10   
            this.skip += 10;
            // this.totalPosts will show the next 10 posts length
            this.totalPosts += posts.length;
        }
    } catch (error) {
        console.error('Error fetching and appending posts:', error);
    }
}

// Check if the bottom of the posts container is reached
isBottomReached() {
    const postsContainer = document.getElementById('posts');
    return postsContainer.scrollTop + postsContainer.clientHeight >= postsContainer.scrollHeight;
}

// Set up scroll listener to fetch more posts when reaching the bottom
async setupScrollListener() {
    document.getElementById('posts').addEventListener('scroll', async () => {
        if (this.isBottomReached()) {
            if (this.totalPosts <= 10) {
                // showing next 10 posts after 2 seconds
                await new Promise(resolve => setTimeout(resolve, 2000));
                console.log("next 10posts")
                this.fetchAndAppendPosts();
            }
        }
    });
}

// Set up click listener for comment icon to toggle comment input
setupCommentIconClickListener() {
    document.body.addEventListener('click', event => {
        const commentIcon = event.target.closest('.bx-comment-dots');
        if (commentIcon) {
            // this is getting the comment input field  through DOM Tree which i keep in html
            const commentInput = commentIcon.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
            if (commentInput) {
                commentInput.style.display = commentInput.style.display === 'none' ? 'block' : 'none';
            }
        }
    });
}

// Set up click listener for edit button to edit comments
setupEditButtonClickListener() {
    document.body.addEventListener('click', async event => {
        const target = event.target;
        const isEditButton = target.classList.contains('edit-comment');

        if (isEditButton) {
            const commentContainer = target.closest('.mycomment');
            const commentTextElement = commentContainer.querySelector('.usercomment p span');
            const commentId = target.dataset.commentId;
            
            const commentEditor = new CommentEditor(commentContainer, commentTextElement, commentId);
            commentEditor.handleEditComment();
        }
    });
}

// Set up listener for search input to fetch posts based on search query
setupSearchInputListener() {
    document.getElementById('searchInput').addEventListener('keyup', async event => {
        const searchQuery = event.target.value.trim();

        if (searchQuery.length > 0) {
            Postfetch.fetchAndAppendPostsBySearch(searchQuery);
        } else {
            await this.fetchAndAppendPosts();
        }
    });
}
}

const AllPosts = new Allposts();
export default AllPosts;






