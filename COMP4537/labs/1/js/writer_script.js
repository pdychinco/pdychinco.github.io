import * as userMessages from "../lang/messages/en/user.js";
const notes = document.getElementById("notes")
const add = document.getElementById("add")

class InputManager {
    constructor() {
        this.id = 0;
    }

    addNewInput() {
        this.id++;
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        wrapper.id = `input-${this.id}`;
        const input = document.createElement('input');
        input.placeholder = userMessages.placeholder;
        input.classList.add('large-input');
        input.addEventListener('blur', () => {
            const text = input.value;
            const parentElement = input.parentElement;

            if (text) {
                localStorage.setItem(`note-${parentElement.id}`, text);
            } 
        })
        const button = document.createElement('button');
        button.classList.add('button')
        button.textContent = userMessages.buttonText;
        button.addEventListener('click', () => {
            const parentElement = button.parentElement;
            const elementToRemove = document.getElementById(`${parentElement.id}`);
            if(elementToRemove) {
                elementToRemove.remove();
                localStorage.removeItem(`note-${parentElement.id}`)
            }
        });
        wrapper.appendChild(input);
        wrapper.appendChild(button);
        notes.appendChild(wrapper);
    }
}

const inputManager = new InputManager();

add.addEventListener('click',() => {
    inputManager.addNewInput();
});