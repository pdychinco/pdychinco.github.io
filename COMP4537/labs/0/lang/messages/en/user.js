export default class Message {
    constructor() {
        this.failed = "Wrong order!"
        this.success = "Excellent memory!"
        this.wrongBoxes = "Please enter a number between 3 and 7."
    }

    displayResult(isCompleted) {
        if (isCompleted) {
            return this.success;
        } else {
            return this.failed;
        }
    }

    displayIncorrectBoxesMessage() {
        return this.wrongBoxes;
    }
}