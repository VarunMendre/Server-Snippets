import dotenv from "dotenv";
dotenv.config();

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;


const button = document.querySelector("button");

const redirectUrl = "http://localhost:5500";
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`;

button.addEventListener("click", () => {
  window.open(authUrl, "auth-popup", "width=500,height=600");
});

window.addEventListener("message", ({ data }) => {
  console.log("Message received in parent window:", data);
  if (data.code) {
    console.log("Code received in parent window:", data.code);
    fetchIdToken(data.code);
  }
});

// Check if we're in a popup by checking if window.opener exists and we have a code parameter
if (window.opener && new URLSearchParams(location.search).get("code")) {
  console.log("Running inside the popup...");
  const code = new URLSearchParams(location.search).get("code");
  console.log("Code received:", code);
  if (code) {
    console.log("Sending code to parent window...");
    window.opener.postMessage({ code }, "*");
    window.close();
  }
}

async function fetchIdToken(code) {
  console.log("Running fetchIdToken function...");
  const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&grant_type=authorization_code`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });

  const data = await response.json();
  if (data.error) {
    console.log("Error occurred");
    console.log(data);
    return;
  }

  const userToken = data.id_token.split(".")[1];
  const userData = JSON.parse(atob(userToken));
  console.log(data);
  console.log(userData);
}
