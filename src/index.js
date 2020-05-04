import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import CognitoConfig from "./components/auth/CognitoConfig";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: CognitoConfig.region,
    userPoolId: CognitoConfig.user_pool_id,
    userPoolWebClientId: CognitoConfig.app_client_id,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
