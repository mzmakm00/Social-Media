
class CommentManager {

  async deleteComment() {
    try {
      const response = await fetch(`https://dummyjson.com/comments/1`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Show SweetAlert after successfully deleting the comment
        await Swal.fire({
          title: "Are you sure?",
          text: "Do you want to delete this comment !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted !",
              text: "Successfully ! Your comment has been deleted",
              icon: "success"
            });
          }
        });
       // Comment deleted successfully
        return true; 
      } else {
        throw new Error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
}

export default new CommentManager();
