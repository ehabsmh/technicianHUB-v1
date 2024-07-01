import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./styles/fonts.css";
import "./styles/general.css";
import { AuthProvider } from "./components/Global/AuthContext.jsx";

// import "@fortawesome/fontawesome-free/css/"

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
