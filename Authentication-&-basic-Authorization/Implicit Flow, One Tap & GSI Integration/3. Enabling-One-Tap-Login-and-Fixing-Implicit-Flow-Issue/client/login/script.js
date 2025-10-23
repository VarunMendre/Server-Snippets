const clientId = "341508182755-lcdl3f8mjnntpk1f9amuoa4i36vl6st5.apps.googleusercontent.com"

window.onload = function () {
  google.accounts.id.initialize({
    client_id:clientId,
    callback: (res) => {
      if (res.credential) {
        loginUserWithIdToken(res.credential)
      } else {
        console.log("Something went wrong");
      }
    },
  });
  google.accounts.id.renderButton(document.getElementById("google-login"), {
    shape: "pill",
  });
  google.accounts.id.prompt();
};


async function loginUserWithIdToken(idToken) {
  console.log(idToken);
  const baseURL = "http://localhost:4000";
  const response = await fetch(`${baseURL}/auth/google`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
  });

  if (response.status === 200) {
    location.href = "/";
  }
}