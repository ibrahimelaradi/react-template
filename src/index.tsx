import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { setupStore, StoreProvider } from "./models";

const store = setupStore();

ReactDOM.render(
  <StoreProvider value={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
