// // Check if we're in a popup by checking if window.opener exists and we have a code parameter
// if (window.opener && new URLSearchParams(location.search).get("code")) {
//   const code = new URLSearchParams(location.search).get("code");
//   if (code) {
//     window.opener.postMessage({ code }, "*");
//     window.close();
//   }
// }
