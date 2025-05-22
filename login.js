async function obtainLoginToken(username, password) {
    const response = await fetch("https://api.mysliwczykrafal.webredirect.org/auth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({username: username, password: password})
    })

    if(response.ok) {
        const jsonData = await response.json();
        window.sessionStorage.setItem("token", jsonData.access_token);
    } else {
        throw new Error(`${response.status} ${response.statusText}`);
    }
}

document.addEventListener("DOMContentLoaded", function() {

    document.querySelector("#login-form").addEventListener("submit", async function(event) {
        event.preventDefault();
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        try {
            await obtainLoginToken(username, password);
            window.location.assign("/chat.html");
        } catch(error) {
            const alertMessageDiv = document.createElement("div");
            alertMessageDiv.style = "color: white; background: #f66151; padding: 5px; border-radius: 5px";
            alertMessageDiv.innerHTML = `Couldn't log you in. ${error}`;
            document.querySelector("#login-form-container").append(alertMessageDiv);
        }
    });
})