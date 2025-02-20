import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importe o BrowserRouter
import "./index.css";
import { FilterProvider } from "./context/Filter.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FilterProvider>
          {" "}
          {/* Envolva o App com o FilterProvider */}
          <App />
        </FilterProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
