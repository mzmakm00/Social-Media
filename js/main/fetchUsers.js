class UserFetcher {
    constructor() {
        // No constructor logic needed for this simple class
    }

    // Fetching user data for the specified userId
    async fetchUserData(userId) {
        try {
            // Fetch user data from the API endpoint
            const userResponse = await fetch(`https://dummyjson.com/users/${userId}`);
            
            // Check if the response is successful
            if (!userResponse.ok) {

                // If response is not ok, throw an error
                throw new Error('Failed to fetch user data for user ' + userId);
            }
            
            // Parse the response JSON data
            const userData = await userResponse.json();
            
            // Return the user data
            return userData;
        } catch (error) {
            
            // If an error occurs during fetching or parsing, log the error and return an empty array
            console.error('Error fetching user data:', error);
            return [];
        }
    }
}
const fetchUser = new UserFetcher();


export default fetchUser;


