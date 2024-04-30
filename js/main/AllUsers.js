import userRendered from "./userhtml.js";

class AllUsersData{
  
  // Fetch data from the API and pass it to the callback function
  fetchDataFromAPI(callback) {
      fetch('https://dummyjson.com/users')
          .then(res => res.json())
          .then(data => {
              callback(data.users);
          })
          .catch(error => error);
  }
  // Show user stories by fetching data from the API and rendering HTML
  showUserStories() {

      // Call the fetchDataFromAPI method to fetch user data
      this.fetchDataFromAPI(usersArray => {
    
        // Get the story container and current user element
          const userStories = document.getElementById('story-container');
          const me = document.getElementById("Me");

          // Get the current user data from localStorage
          const currentUserData = JSON.parse(localStorage.getItem("userData"));
          const currentImage = currentUserData.image;
          me.src = currentImage;

          // Check if the fetched data is an array
          if (Array.isArray(usersArray)) {
              // Iterate through each user and create HTML for their story
              usersArray.forEach(user => {
                  const userHTML = userRendered.showUserstories(user);
                  // Append the user story HTML to the story container
                  userStories.innerHTML += userHTML;
              });
          }
      });
  }
}

const Allusers = new AllUsersData()
export default Allusers ;


