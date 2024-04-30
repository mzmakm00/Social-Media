import CommentImages from "../posts/postcomments.js";
import PostRenderer from "../posts/posthtml.js";


class UserPostPage {
  
   // Asynchronously fetches user Post by ID
    async fetchUserPostsById(userId, useData) {
      try {
        const res = await fetch(`https://dummyjson.com/posts/user/${userId}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        // posts response
        const postsData = await res.json();
        const posts = postsData.posts;
        document.querySelector('.postscount').textContent = posts.length;
  
        for (const post of posts) {
            const commentsResponse = await fetch(`https://dummyjson.com/comments/post/${post.id}`);
            if (!commentsResponse.ok) {
                throw new Error('Failed to fetch comments for post ' + post.id);
            }
            // getting coments on post from the comment API
            const commentsData = await commentsResponse.json();
            const comments = commentsData.comments;
            const tags = post.tags;

            const hashtagsHTML = tags.map(tag => `#${tag}`).join(' ');
            // Here You can also see here some daya is change
            const postCard = PostRenderer.postHtml(useData,post,hashtagsHTML);
          const card = document.getElementById('post');
          card.innerHTML += postCard;

          const postContainer = card.lastElementChild.querySelector('.comments-container');
          await CommentImages.loadCommentsWithImages(comments, postContainer);
        };
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    }
  }
  
  // Create an instance of UserPostPage and export it
  const userPostPage = new UserPostPage();
  export default userPostPage;
  
  