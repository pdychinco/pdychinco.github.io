// this code has been created with the help of chatGPT

import Message from '../lang/messages/en/user.js'

const submit = document.getElementById("go");
const input = document.getElementById("numOfBox");
const boxLocation = document.getElementById("boxes");
const message = document.getElementById("message");

const arrayColors = ["Red", "Blue","Yellow","Purple","Green","Orange","Black"];
const msg = new Message();
class GameLogic {
    constructor(numOfBoxes) {
        this.arrayButtons = [];
        this.numOfBoxes = numOfBoxes;
    }

    stallShuffle() {
        this.arrayButtons.forEach(button => {
            button.shuffle(button.getRandomPosition(button));
        })
    }

    removeButtons() {
        while(boxLocation.firstChild) {
            boxLocation.removeChild(boxLocation.firstChild);
        }
    }

    createButtons() {
        for (let index = 0; index < this.numOfBoxes; index++) {
            const button = new Button(arrayColors[index], index);
            button.addEventListener('click', () => {
                if(button.order != this.arrayButtons[0].order) {
                    message.innerHTML = msg.displayResult(false);
                } else {
                    this.arrayButtons.shift();
                    boxLocation.removeChild(boxLocation.firstChild);
                    if (this.arrayButtons.length === 0) {
                        message.innerHTML = msg.displayResult(true);
                    }
                } 
            });
            this.arrayButtons.push(button);
        }
    }

    playGame() {
        this.removeButtons();
        this.createButtons();
        this.gameLogic();

    }

    gameLogic() {
        setTimeout(() => {
            this.stallShuffle();
            let counter = 1;
            const intervalID = setInterval(() => {
                counter += 1;
                this.stallShuffle();
                if (counter > this.numOfBoxes - 1) {
                    clearInterval(intervalID);
    
                    // After shuffle is complete, allow clicks and clear button text
                    this.arrayButtons.forEach(button => {
                        button.toggleClick(); // Allow the button to be clicked
                        button.button.textContent = ""; // Set button text to blank
                    });
                }
            }, this.numOfBoxes * 500);
        }, this.numOfBoxes * 1000);
    }
}



submit.addEventListener('click', () => {
    const numOfBoxes = Number(input.value);
    
    if (numOfBoxes < 3 || numOfBoxes > 7) {
        message.innerHTML = msg.displayIncorrectBoxesMessage();
    } else {
        message.innerHTML = "";
        const gameLogic = new GameLogic(numOfBoxes);
        gameLogic.playGame();
    }
})




    
class Button {
    constructor(color, order) {
        this.order = order+1;
        this.button = document.createElement("button");
        this.button.classList.add("btn")
        this.color = color;
        this.height = "5em";
        this.width = "10em";
        this.padding = "2em";
        this.disabled = true;
        boxLocation.appendChild(this.button);
        this.button.textContent = this.order;
        this.applyStyle();
    }

    applyStyle() {
        this.button.style.backgroundColor = this.color;
        this.button.style.height = this.height;
        this.button.style.width = this.width;
        this.button.style.border = "none";
        this.button.style.justifyContent = "center";
        this.button.style.textAlign = "center";
    }

    shuffle(coord) {
        this.button.style.position = "absolute";
        this.button.style.top = `${coord.y}px`;
        this.button.style.left = `${coord.x}px`;
        this.button.disabled = this.disabled;
    }

    toggleClick() {
        this.disabled = !this.disabled;
        this.button.disabled = this.disabled;
        this.applyStyle(); // Update styles based on disabled state
    }

    disableButton() {
        this.disabled = true;
        this.button.disabled = true;
        this.applyStyle(); // Update styles for disabled state
    }

    getRandomPosition(element) {
        const containerRect = boxLocation.getBoundingClientRect();
        const elementRect = element.button.getBoundingClientRect();
        
        const maxX = containerRect.width - elementRect.width;
        const maxY = containerRect.height - elementRect.height;
    
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
    
        return {x: randomX, y: randomY };
    }

    addEventListener(event, callback) {
        this.button.addEventListener(event, callback);
    }
}

