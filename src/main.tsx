import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/routes/index";
import "../src/style/index.css";
import { AuthProvider } from "./utils/contexts/token";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
