import Allusers from "./AllUsers.js";
import userRendered from "./userhtml.js";

class UserPageHandler {
  // Open user page by redirecting to the specified user ID
  openUserPage(userId) {
      window.location.href = `user.html?id=${userId}`;
  }

  // Show all users by fetching data from the API and rendering HTML
  showAllUsers() {
      // Call the fetchDataFromAPI method of Allusers to fetch user data
      Allusers.fetchDataFromAPI(usersArray => {
          // Get the user list container
          const userList = document.getElementById('userlist');

          // Check if the fetched data is an array
          if (Array.isArray(usersArray)) {
              // Iterate through each user and create HTML for user list
              usersArray.forEach(user => {

                  const userHTML = userRendered.userHtml(user);
                
                  // Append the user HTML to the user list container
                  userList.innerHTML += userHTML;
              });

              // Add event listeners to user names and images
              const userNames = document.querySelectorAll('.user-name');
              userNames.forEach(name => {
                  name.addEventListener('click', event => {
                      const userId = event.target.getAttribute('data-user-id');
                      // Open user page with the specified user ID
                      this.openUserPage(userId);
                  });
              });

              const userImages = document.querySelectorAll('.user-image');
              userImages.forEach(image => {
                  image.addEventListener('click', event => {
                      const userId = event.target.getAttribute('data-user-id');
                      // Open user page with the specified user ID
                      this.openUserPage(userId);
                  });
              });
          }
      });
  }
}

// Create an instance of UserPageHandler
const userPageHandler = new UserPageHandler();


export default userPageHandler