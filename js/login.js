// username: 'kminchelle',
// password: '0lelplR',
class LoginManager {
  constructor() {
    // Get references to the username and password input fields
    this.username = document.getElementById("username");
    this.password = document.getElementById("password");

    // Add event listener to the login button
    document.getElementById("LogInBtn").addEventListener("click", this.handleLogin.bind(this));
  }

  // Event handler for the login button click event
  async handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    // Get the values from the input fields
    const userInput = this.username.value;
    const passwordInput = this.password.value;

    // Check if the fields are empty
    if (userInput === '' || passwordInput === '') {
      await this.showError("Fields can't be empty");
    } else {
      // If fields are not empty, initiate the login process
      this.login(userInput, passwordInput);
    }
  }

  // Method to handle the login process
  async login(userInput, passwordInput) {
    try {
      // Send login request to the server
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userInput,
          password: passwordInput,
          expiresInMins: 30,
        }),
      });

      // Check if the login request was successful
      if (response.ok) {
        // If successful, parse the response and store user data in local storage
        const res = await response.json();
        let userData = {
          username: res.username,
          firstname: res.firstName,
          lastname: res.lastName,
          email: res.email,
          token: res.token,
          image: res.image,
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        // Redirect to social.html upon successful login
        window.location.href = "social.html";
      } else {
        // If login request fails, parse the error response and show error message
        const errorData = await response.json();
        await this.showError(errorData.message);
      }
    } catch (error) {
      // Handle unexpected errors and show error message
      console.error("Error:", error);
      await this.showError("There was an error processing your request. Please try again later.");
    }
  }

  // Method to display error messages using Swal (SweetAlert)
  async showError(message) {
    await Swal.fire({
      icon: "error",
      title: "OOPS",
      text: message,
    });
  }
}

// Create an instance of the LoginManager class
const loginManager = new LoginManager();
