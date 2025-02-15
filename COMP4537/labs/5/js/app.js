const sqlQuery = document.getElementById("sqlQuery").value;
const message = document.getElementById("message");
const defaultUsers = document.getElementById("sendUserData");
const sendSqlQuery = document.getElementById("sendSQLQuery");
const xhr = new XMLHttpRequest();

defaultUsers.addEventListener("click", () => {
    const users = [
        { name: "Sara Brown", dateOfBirth: "1901-01-01" },
        { name: "John Smith", dateOfBirth: "1941-01-01" },
        { name: "Jack Ma", dateOfBirth: "1961-01-30" },
        { name: "Elon Musk", dateOfBirth: "1999-01-01" }
    ];


    xhr.open("POST", `https://walrus-app-46awa.ondigitalocean.app/comp4537/labs/5/add-users?users=${users}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // Request is complete
            if (xhr.status === 201) { // Success response
                const response = JSON.parse(xhr.responseText);
                message.innerHTML = response.message;
            } else { // Error handling
                message.innerHTML = `Error: ${xhr.responseText}`;
            }
        }
    };
    xhr.send(JSON.stringify(users));

});

sendSqlQuery.addEventListener("click", () => {
    if (sqlQuery.includes("SELECT")) {
        xhr.open("GET", `https://walrus-app-46awa.ondigitalocean.app/comp4537/labs/5/get-users?sql=${sqlQuery}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) { // Success response
                    const response = JSON.parse(xhr.responseText);
                    message.innerHTML = response.message;
                } else { // Error handling
                    console.error("Error:", xhr.responseText);
                    alert("Failed to send data");
                }
            }
        }
    } else { // SQL Query has insert
        xhr.open("POST", "https://walrus-app-46awa.ondigitalocean.app/comp4537/labs/5/add-user", true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // Request is complete
                if (xhr.status === 201) { // Success response
                    const response = JSON.parse(xhr.responseText);
                    message.innerHTML = response.message;
                    // console.log("Response:", response);
                    // alert(response.message || "Users added successfully");
                } else { // Error handling
                    console.error("Error:", xhr.responseText);
                    alert("Failed to send data");
                }
            }
        };
    
        xhr.send(JSON.stringify({sql: sqlQuery}));
    }
});