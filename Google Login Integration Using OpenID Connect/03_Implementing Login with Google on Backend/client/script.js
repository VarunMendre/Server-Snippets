const nameElement = document.querySelector("#name");
const emailElement = document.querySelector("#email");
const imageElement = document.createElement("img");

const baseURL = "http://localhost:4000";

const response = await fetch(`${baseURL}/profile`, {
  credentials: "include",
});

if (response.status === 401) {
    location.href = "./login/login.html"
}
const { name: userName, email, picture } = await response.json();

nameElement.textContent = userName;
emailElement.textContent = email;
imageElement.src = picture;

document.body.appendChild(imageElement);
