const button = document.querySelector("button");

const clientId =
  "341508182755-lcdl3f8mjnntpk1f9amuoa4i36vl6st5.apps.googleusercontent.com";
const redirectUrl = "http://localhost:5500/callback.html";
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&nonce=123&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`;

button.addEventListener("click", () => {
  window.open(authUrl, "auth-popup", "width=500,height=600");
});

window.addEventListener("message", async ({ data }) => {
  if (data.message === "success") {
    location.href = "/";
  } else {
    const para = document.createElement("p");
    para.innerText = "Something went wrong!";
    document.body.appendChild(para);
    setTimeout(() => {
      para.remove();
    }, 2000);
  }
});
