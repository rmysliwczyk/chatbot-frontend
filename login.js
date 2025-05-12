async function obtainLoginToken(username, password) {
    const response = await fetch("https://api.mysliwczykrafal.webredirect.org/auth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({username: username, password: password})
    })

    const jsonData = await response.json();
    window.sessionStorage.setItem("token", jsonData.access_token)
}

document.addEventListener("DOMContentLoaded", function() {

    document.querySelector("#login-form").addEventListener("submit", async function(event) {
        event.preventDefault();
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        await obtainLoginToken(username, password);
        window.location.assign("/chat.html");
    });
})