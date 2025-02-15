//ChatGPT-3.5  (https://chat.openai.com/) was used to code solutions presented in this assignment

const getButton = document.getElementById("getAPI");
const input = document.getElementById("textbox");
const definition = document.getElementById("definition");



getButton.addEventListener("click", () => {
    const queryWord = input.value;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                try {
                    const data = JSON.parse(this.responseText); 
                    
                    if (data[queryWord]) {
                        definition.innerText = `${queryWord} defintion is: ${data[queryWord]}`; // Show the definition
                    } else {
                        definition.innerText = "Definition not found.";
                    }
                } catch (error) {
                    console.error("JSON Parse Error:", error);
                    definition.innerText = "Error parsing response.";
                }
            } else {
                console.error(`HTTP Error: ${this.status}`);
                definition.innerText = "Error fetching definition.";
            }
        }
    };

    xhttp.open("GET", `https://isalb4-ee27a7ebfca9.herokuapp.com/?word=${queryWord}`, true);
    xhttp.send();
});
