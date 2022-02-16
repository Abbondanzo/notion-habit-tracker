import React from "react";
import ReactDOM from "react-dom";
// TODO: https://github.com/Semantic-Org/Semantic-UI-CSS/issues/75
// import "semantic-ui-css/semantic.min.css";
import App from "./App";
import { AuthenticationGate } from "./authentication/components/AuthenticationGate";
import "./index.css";
import { TRPCProvider } from "./providers/TRPCProvider";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <TRPCProvider>
      <AuthenticationGate>
        <App />
      </AuthenticationGate>
    </TRPCProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
