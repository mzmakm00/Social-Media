
// This class is for searching the messages name from the messages div
class MessageSearch {
    constructor() {
        this.messageNotification = document.querySelector('#messages-notifications');
        this.messages = document.querySelector('.messages');
        this.messageElements = document.querySelectorAll('.message');
        this.messageSearch = document.querySelector('#message-search');

        this.messageSearch.addEventListener('keyup', this.searchMessage.bind(this));
    }

    searchMessage() {
        const val = this.messageSearch.value.toLowerCase();
        console.log(val);
        this.messageElements.forEach(message => {
            let name = message.querySelector('h5').textContent.toLowerCase();
            if (name.indexOf(val) !== -1) {
                message.style.display = 'flex';
            } else {
                message.style.display = 'none';
            }
        });
    }
}

const messageSearch = new MessageSearch()

export default messageSearch