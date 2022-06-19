import React from "react";
import ReactDOM from "react-dom";
// TODO: https://github.com/Semantic-Org/Semantic-UI-CSS/issues/75
// import "semantic-ui-css/semantic.min.css";
import App from "./App";
import { ConnectionProvider } from "./connection/public/components/ConnectionProvider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Theme } from "./Theme";

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <ConnectionProvider>
        <App />
      </ConnectionProvider>
    </Theme>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
