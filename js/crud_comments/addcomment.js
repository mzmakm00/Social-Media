import userDataManager from "../auth/token.js";
import PostRenderer from "../posts/posthtml.js";
import CommentManager from "./deletecoment.js";


class CommentHandler {
    constructor() {
        // Bind event listener methods to the class instance
        this.handleDeleteCommentClick = this.handleDeleteCommentClick.bind(this);
        this.handlePostCommentClick = this.handlePostCommentClick.bind(this);
        this.initialize()
    }
    
    // this method for event listener
    initialize() {
        // Add event listener for delete comment button clicks
        document.body.addEventListener('click', this.handleDeleteCommentClick);

        // Add event listener for post comment button clicks
        document.body.addEventListener('click', this.handlePostCommentClick);
    }

    // this method is using for deleting comment
     async handleDeleteCommentClick(event) {
        if (event.target.classList.contains('delete-comment')) {
            const commentId = event.target.dataset.commentId;
            try {
                // Hiting the Delete API using comment ID
                await CommentManager.deleteComment(commentId);
                // Remove the comment div from the UI
                const commentDiv = event.target.closest('.mycomment');
                if (commentDiv) {
                    commentDiv.remove();
                }
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    }
    
    // This method is handling post button of edited comment  
    async handlePostCommentClick(event) {
        if (event.target.classList.contains('comment-post')) {
            const postId = event.target.dataset.postId;
            const inputField = event.target.parentElement.querySelector('input');
            const commentInput = event.target.parentElement;
            const commentText = inputField.value.trim();
            console.log(commentText)

            if (commentText !== '') {
                try {
                    const responseData = await this.postComment(postId, commentText);
                    inputField.value = ''; // Clear input field
                    commentInput.style.display = 'none'; // Hide comment input field after posting

                    // Append the new comment to the post container
                    const postContainer = event.target.closest('.card').querySelector('.comments-container');
                    const commentContainer = document.createElement('div');

                    // Check if the comment belongs to the current user
                    const currentUserId = await this.getUserId();
                    const isCurrentUserComment = responseData.user.id === currentUserId;

                    // Getting the currrent User Image 
                    const getimage = localStorage.getItem("userData")
                    let useData = JSON.parse(getimage)
                    let userImage = useData.image 


                    commentContainer.innerHTML = PostRenderer.commentHtml(responseData,userImage,isCurrentUserComment)
                    postContainer.appendChild(commentContainer);

                } catch (error) {
                    console.error('Error posting comment:', error);
                }
            }
        }
    }
   
    // using ADD Comment API 
    async postComment(postId, commentText) {
        const userId = await this.getUserId();
        try {
            const response = await fetch('https://dummyjson.com/comments/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    body: commentText,
                    postId: postId,
                    userId: userId
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Add Comment",responseData)
                return responseData;
            } else {
                throw new Error('Failed to post comment');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            throw error;
        }
    }
    
    // Getting the Current USer ID 
    async getUserId() {
        try {
            const userId = await userDataManager.fetchUserData();
            if (userId) {
                return userId;
            } else {
                console.log("User ID not available");
                return null;
            }
        } catch (error) {
            console.error("Error getting user ID:", error);
            return null;
        }
    }
}
const commentHandler = new CommentHandler();

export default commentHandler;
