class UserDataManager {
    constructor() {
      // Bind the methods to the class instance
      this.fetchUserData = this.fetchUserData.bind(this);
      this.clearToken = this.clearToken.bind(this);
      this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    async fetchUserData() {
      try {
        // Retrieve user data from local storage
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData || !userData.token) {
          // If user data or token is missing, redirect to login page
          this.redirectToLogin();
          throw new Error("User data or token not found");
        }
  
        // Fetch user data from the server
        const response = await fetch('https://dummyjson.com/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + userData.token,
          },
        });
  
        // Handle non-ok responses
        if (!response.ok) {
          if (response.status === 401) {
            alert("Session expired");
            this.clearToken();
            this.redirectToLogin();
          } else {
            throw new Error('Network response was not ok');
          }
        }
  
        // Parse the response and return user ID
        const data = await response.json();
        localStorage.setItem("currentUser", data.id)
        return data.id; 
      } catch (error) {
        // Handle errors and redirect to login page
        console.error('Error fetching user data:', error);
        this.redirectToLogin();
      }
    }
  
    // Method to clear token from local storage
    clearToken() {
      localStorage.removeItem("userData");
    }
  
    // Method to redirect to the login page
    redirectToLogin() {
      window.location.href = "index.html";
    }
  }
  
  // Export an instance of UserDataManager
  const userDataManager = new UserDataManager();
  export default userDataManager;
  