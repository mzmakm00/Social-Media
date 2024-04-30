import fetchUser from "../main/fetchUsers.js";
import userPostPage from "./userPost.js";


class UserIdPage {
  async fetchUserDataById(userId) {
    // Fetching the current user which is click
    const useData = await fetchUser.fetchUserData(userId);    
    // Update the HTML content with fetched user data
    document.getElementById('user-image1').src = useData.image;
    document.getElementById('user-username').textContent = useData.firstName;
    await userPostPage.fetchUserPostsById(userId, useData);        
  }
}
const UserIdpage = new UserIdPage();
export default UserIdpage;
