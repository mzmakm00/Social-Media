import userDataManager from "../auth/token.js";
import UserIdpage from "./userId.js";

// fetching the current user ID from class
userDataManager.fetchUserData()

// Sending to this id in URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

await UserIdpage.fetchUserDataById(userId);



