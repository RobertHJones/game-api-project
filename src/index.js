import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-ucnrjpf9.eu.auth0.com"
    clientId="8YHmP2i5EU2AzFmIT95BnwvrB9CdCDnf" // make another project and change this
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
