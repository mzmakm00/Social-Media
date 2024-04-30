import fetchUser from "../main/fetchUsers.js";
import PostRenderer from "./posthtml.js";
import CommentImages from "./postcomments.js"
import UserContainerHandler from "./showingUser.js";
class PostFetcher {
    
    async fetchAndAppendPostsBySearch(query) {
        try {
            // Fetch posts based on the search query
            const response = await fetch(`https://dummyjson.com/posts/search?q=${query}`);
            
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch posts based on search query');
            }
            
            // Parse the response data as JSON
            const searchData = await response.json();
            const searchPosts = searchData.posts;
            
            // Get the container element for posts
            const card = document.getElementById('posts');
            // Clear existing posts from the container
            card.innerHTML = '';

            // Iterate over each post retrieved from the search
            for (const post of searchPosts) {
                // Fetch user data associated with the post
                const userData = await fetchUser.fetchUserData(post.userId);

                // Initialize an empty string to hold hashtags HTML
                let hashtagsHTML = '';
                
                // Check if the post has tags
                if (post.tags && post.tags.length > 0) {
                    // Generate HTML for hashtags
                    hashtagsHTML = post.tags.map(tag => `#${tag}`).join(' ');
                }

                // Generating HTML for the post using PostRenderer
                let postHTML = PostRenderer.postHtml(userData, post, hashtagsHTML);
                
                // Append the generated post HTML to the card container
                card.innerHTML += postHTML;

                // this class is for getting the userID and showing his posts
                new UserContainerHandler(card)

                // Get the container for comments associated with the post
                const postContainer = card.lastElementChild.querySelector('.comments-container');
                
                // Load comments with images using CommentImages module
                CommentImages.loadCommentsWithImages(comments, postContainer);
            }
        } catch (error) {
            // Log any errors that occur during fetching and appending posts
            console.error('Error fetching and appending posts by search:', error);
        }
    }
}

const Postfetch = new PostFetcher();
export default Postfetch;
