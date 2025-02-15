//ChatGPT-3.5  (https://chat.openai.com/) was used to code solutions presented in this assignment 

const postButton = document.getElementById("postAPI");
const wordBox = document.getElementById("wordbox");
const wordDefinition = document.getElementById("wordDefintion"); 

postButton.addEventListener("click", () => {
    const queryWord = wordBox.value.trim();
    const queryDefinition = wordDefinition.value.trim();

    if (!queryWord || !queryDefinition) {
        console.error("Word and definition cannot be empty.");
        return;
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 201) {
                try {
                    const data = JSON.parse(this.responseText); 
                    
                    alert(`✅ ${data.message}`);
                } catch (error) {
                    console.error("JSON Parse Error:", error);
                    alert("❌ Error parsing server response.");
                }
            } else {
                console.error(`HTTP Error: ${this.status}`);
                alert(`❌ Error: ${this.statusText}`);
            }
        }
    };

    
    xhttp.open("POST", "https://isalb4-ee27a7ebfca9.herokuapp.com", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    
    const requestData = JSON.stringify({
        newWord: queryWord,
        definition: queryDefinition
    });

    console.log("Sending Data:", requestData);
    xhttp.send(requestData);
});
