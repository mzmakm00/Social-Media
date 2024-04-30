import commentHandler from "../crud_comments/addcomment.js";
import fetchUser from "../main/fetchUsers.js";
import PostRenderer from "./posthtml.js";

 //  The Comments which are showing on post 

class CommentLoader {
    constructor() {
        this.currentUserId = null;
    }

    // Fetch the current user's ID
    async getUserId() {
        this.currentUserId = await commentHandler.getUserId();
    }
    
    // Showing comment with Users Picutree
    async loadCommentsWithImages(comments, postContainer) {
        try {
            // Ensure current user ID is fetched
            if (!this.currentUserId) {
                await this.getUserId();
            }

            // Iterate through each comment
            comments.forEach(async comment => {

                // Fetch user data for the comment
                const userData = await fetchUser.fetchUserData(comment.user.id);
                
                // Get the user's profile image
                const userImage = userData.image;
                const isCurrentUser = comment.user.id === this.currentUserId 
                // Already Post Comments
                const commentHTML = PostRenderer.commentHtml(comment,userImage,isCurrentUser)

                // Append the comment HTML to the post container
                postContainer.innerHTML += commentHTML;
            });
        } catch (error) {
            console.error('Error loading comments with images:', error);
        }
    }
}


const CommentImages = new CommentLoader();

export default CommentImages;

