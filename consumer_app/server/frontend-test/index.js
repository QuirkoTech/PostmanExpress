const loginButton = document.querySelector(".login");
const logoutButton = document.querySelector(".logout");

loginButton.addEventListener("click", () => {
    fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            user_email: "hello@mal.com",
            password: "2938749",
        }),
        credentials: "include",
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
        });
});

logoutButton.addEventListener("click", () => {
    fetch("http://localhost:3002/auth/logout", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        credentials: "include",
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
        });
});
