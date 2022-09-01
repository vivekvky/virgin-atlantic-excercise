
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import './index.css'
import { SearchContextProvider } from "./store/search-context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <SearchContextProvider>
      <Router>
        <App />
      </Router>
    </SearchContextProvider>
  </React.StrictMode>,
  rootElement
);
