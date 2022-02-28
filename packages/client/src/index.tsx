import React from "react";
import ReactDOM from "react-dom";
// TODO: https://github.com/Semantic-Org/Semantic-UI-CSS/issues/75
// import "semantic-ui-css/semantic.min.css";
import App from "./App";
import { AuthenticationGate } from "./authentication/components/AuthenticationGate";
import { ClientProvider } from "./components/ClientProvider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationGate>
      <ClientProvider>
        <App />
      </ClientProvider>
    </AuthenticationGate>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
