import {
  GoogleLogin,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import "./App.css";

function App() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });

  // useGoogleOneTapLogin({
  //   onSuccess: (credentialResponse) => {
  //     console.log(credentialResponse);
  //   },
  //   onError: () => {
  //     console.log("Login Failed");
  //   },
  // });
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        shape="pill"
        theme="filled_blue"
        text="continue_with"
        onError={() => {
          console.log("Login Failed");
        }}
        // useOneTap
      />

      {/* <button onClick={login}>Login with Google</button> */}
    </>
  );
}

export default App;
