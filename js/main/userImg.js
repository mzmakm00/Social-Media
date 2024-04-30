import userPageHandler from "./singleuser.js";

class UserHandler {
    constructor() {
        this.setupEventListeners();
    }
    
    // showing current user Image in the navbar
    currentUserImg() {
        let userDataString = localStorage.getItem('userData');

        if (userDataString) {
            let userData = JSON.parse(userDataString);
            let userImageURL = userData.image;
            if (userImageURL) {
                var userImageElement = document.querySelector('.userImage');
                userImageElement.src = userImageURL;
            }
        }
    }

    // Function to retrieve user data from local storage
    getUserDataFromLocalStorage() {
        let userDataString = localStorage.getItem('userData');
        if (userDataString) {
            return JSON.parse(userDataString);
        } else {
            return null;
        }
    }

    // Function to populate user information in the dropdown
    populateUserInfo() {
        let userData = this.getUserDataFromLocalStorage();
        if (userData) {
            document.querySelector('.userImagedrop').src = userData.image;
            document.querySelector('.first-name').textContent = userData.firstname;
            document.querySelector('.last-name').textContent = userData.lastname;
            document.querySelector('.username').textContent = userData.username;
            // Add event listener to user image
            document.querySelector('.userImagedrop').addEventListener('click', () => {
                const id = localStorage.getItem("currentUser");
                // Open user page with the current user's ID
                userPageHandler.openUserPage(id);
            });

            // Add event listener to username
            document.querySelector('.first-name').addEventListener('click', () => {
                // Open user page with the current user's ID
                userPageHandler.openUserPage(id);
            });
        }
    }

    // Click button listener
    setupEventListeners() {
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });
    }
    // method to redirect back to login page and and remove the userData from localStorage
    logout() {
        localStorage.removeItem("userData")
        window.location.href = 'index.html'
    }
}

const userHandler = new UserHandler(); 
export default userHandler;
