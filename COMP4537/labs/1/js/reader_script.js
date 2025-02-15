const localStorageList = document.getElementById('notes');


window.addEventListener('DOMContentLoaded', () => {
    // Clear the list first
    localStorageList.innerHTML = '';

    // Loop through all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Get the key at index i
        const value = localStorage.getItem(key); // Get the value for the key

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        const input = document.createElement('input');
        input.classList.add('large-input');
        input.disabled = true;
        input.value = value;
        wrapper.appendChild(input);
        localStorageList.appendChild(wrapper);
    }

    if (localStorage.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'LocalStorage is empty.';
        localStorageList.appendChild(emptyMessage);
    }
});