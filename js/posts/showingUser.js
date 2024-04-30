import userPageHandler from "../main/singleuser.js";

// this class is for gettig the ID of that user which are showing on posts by clicking on post name 
class UserContainerHandler {
    constructor(card) {
        this.card = card;                                                // take the card as a parameter
        this.userContainers = this.card.querySelectorAll('.ms-3');       // getting the comment Div
        this.addClickListeners();                       
    }

    addClickListeners() {
        this.userContainers.forEach(userContainer => {           // looping for each user that easily target the ID       
            userContainer.addEventListener('click', () => {      // Retriving everyuser ID on click
                const userId = userContainer.dataset.userId;
                this.openUserPage(userId);
            });
        });
    }

    openUserPage(userId) {
        // now pass the ID of the specific user to this class method 
        userPageHandler.openUserPage(userId);
    }
}

// Example usage:

export default UserContainerHandler;