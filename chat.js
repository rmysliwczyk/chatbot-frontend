async function chat(messages) {
    
    const response = await fetch("https://api.mysliwczykrafal.webredirect.org/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(messages)
    })

    if(response.status == "401") {
        throw new Error("User not logged in", {cause: "not_logged_in"} )
    }

    const jsonData = await response.json();
    return jsonData.message;
}

async function displayMessages(messages) {
    const messageHistoryDiv = document.querySelector('#message-history-container');
    messageHistoryDiv.innerHTML = "";
    for(let message of messages) {
        const newMessage = document.createElement("div");
        newMessage.innerHTML = message.content;
        messageHistoryDiv.append(newMessage);
    }
    window.scrollTo(0, document.body.scrollHeight);
}

let messageHistory = [];

document.addEventListener("DOMContentLoaded", function() {
    console.log(window.sessionStorage.getItem("token"))
    if(window.sessionStorage.getItem("token") == null)
    {
        window.location.assign("/index.html");
    }
    else {
        document.querySelector("#chat-form").addEventListener("submit", async function(event) {
            event.preventDefault();
            const content = document.querySelector('#content').value;
            const message = { "role": "user", "content": content};

            messageHistory.push(message);
            displayMessages([...messageHistory, { "role": "waiting", "content": "Generating response..."}]);
            try {
                document.querySelector('#content').value = "";
                const responseMessage = await chat(messageHistory);

                messageHistory.push(responseMessage);
                displayMessages(messageHistory);
            
            } catch (error) {
                if(error.cause == "not_logged_in") {
                    window.location.assign("/index.html")
                }
                else {
                    console.log(error);
                }
            }
        });
    }
})