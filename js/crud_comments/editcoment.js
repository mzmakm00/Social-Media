class CommentEditor {
  
  constructor(commentContainer, commentTextElement, commentId) {
    // Initialize properties to store references to the comment container and text element
    this.commentContainer = commentContainer;
    this.commentTextElement = commentTextElement;

    // Bind the event listener method to the class instance
    // This ensures that when the method is called, `this` refers to the instance of the class
    this.handlePostButtonClick = this.handlePostButtonClick.bind(this);
}

    handleEditComment() {
      const commentText = this.commentTextElement.textContent.trim();
      // Create input field and post button
      this.inputButtonContainer = document.createElement('div');
      this.inputButtonContainer.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mt-3');
  
      this.commentInput = document.createElement('input');
      this.commentInput.value = commentText;
      this.commentInput.classList.add('w-100');
      this.postButton = document.createElement('button');
      this.postButton.textContent = 'Update';
      this.postButton.classList.add('btn', 'btn-sm', 'btn-primary', 'post-comment');
  
      this.inputButtonContainer.appendChild(this.commentInput);
      this.inputButtonContainer.appendChild(this.postButton);
  
      // Append the container after the last comment
      const cardBody = this.commentContainer.closest('.card-body');
      
      const lastComment = cardBody.querySelector('.comments-container').lastElementChild;
      cardBody.insertBefore(this.inputButtonContainer, lastComment.nextElementSibling);
  
      // Add event listener for the post button
      this.postButton.addEventListener('click', this.handlePostButtonClick);
    }
  
    async handlePostButtonClick() {
      const newCommentText = this.commentInput.value.trim();
      try {
        // Edit the comment on the server
        const editedCommentData = await this.editComment(newCommentText);

        // Update the comment text element with the new text
        this.commentTextElement.textContent = newCommentText;
  
        // After updating the comment, you may want to remove the input field and post button
        this.inputButtonContainer.remove();
      } catch (error) {
        console.error('Error editing comment:', error);
        // Handle error
      }
    }
  
    async editComment(newCommentText) {
      try {
        const response = await fetch(`https://dummyjson.com/comments/1`, {
          method: 'PATCH', // or 'PATCH' depending on your API
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            body: newCommentText,
          })
        });
  
        if (response.ok) {
          const responseData = await response.json();
          
          return responseData; // Return the edited comment data
        } else {
          throw new Error('Failed to edit comment');
        }
      } catch (error) {
        console.error('Error editing comment:', error);
        throw error;
      }
    }
  }
  
  export default CommentEditor;
  

