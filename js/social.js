import userDataManager from "./auth/token.js";
import AllPosts from "./posts/allposts.js";
import AllUsersData from "./main/AllUsers.js";
import commentHandler from "./crud_comments/addcomment.js";
import  userPageHandler  from "./main/singleuser.js";
import  userHandler from "./main/userImg.js";
import messageSearch from "./main/searchMessags.js";


// Function to check if all functions are loaded
async function checkAllFunctionsLoaded() {
    await Promise.all([                    // Asynchronously waits for all promises to resolve
        userDataManager.fetchUserData(),   // Fetches user data
        AllPosts.fetchAndAppendPosts(),    // this Fetches and appends posts
        userHandler.populateUserInfo(),    // this is populating the loggedd in User Information Populates
        userHandler.currentUserImg(),      // Retrieves current user's image
        AllUsersData.showUserStories(),    // Showing user stories
        userPageHandler.showAllUsers(),    // Showing all users
        commentHandler.postComment(),      // Posts a comment
        messageSearch.searchMessage()      // Searches for a message
    ]);
}


// Call the function to check if all functions are loaded
checkAllFunctionsLoaded();

