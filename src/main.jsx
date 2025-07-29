import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ShopContextProvider } from "./context/ShopContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <ShopContextProvider>
        <div> Hello   </div>
        <App />
      </ShopContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
