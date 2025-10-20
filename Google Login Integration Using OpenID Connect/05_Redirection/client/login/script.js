const button = document.querySelector("button");

const baseURL = "http://localhost:4000";
const clientId =
  "341508182755-lcdl3f8mjnntpk1f9amuoa4i36vl6st5.apps.googleusercontent.com";

const clientSecret = "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";
const redirectUrl = "http://localhost:4000/auth/google/callback";
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`;

button.addEventListener("click", () => {
  window.open(authUrl, "auth-popup", "width=500,height=600");
});

window.addEventListener("message", async({ data }) => {
    const response = await fetch(`${baseURL}/auth/google/callback`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type":"application/json",
      },
      credentials: "include"
    });
    const responseData = await response.json();
  console.log(responseData);
  
  location.href = "/";
});



// async function fetchIdToken(code) {
//   console.log("Running fetchIdToken function...");
//   const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&grant_type=authorization_code`;

//   const response = await fetch("https://oauth2.googleapis.com/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: payload,
//   });

//   const data = await response.json();
//   if (data.error) {
//     console.log("Error occurred");
//     console.log(data);
//     return;
//   }

//   const userToken = data.id_token.split(".")[1];
//   const userData = JSON.parse(atob(userToken));
//   console.log(data);
//   console.log(userData);
// }
