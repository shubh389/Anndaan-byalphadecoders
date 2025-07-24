import "./global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Ensure we only create root once
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

// Check if root is already created (prevents double mounting in development)
let root = (container as any)._reactRoot;
if (!root) {
  root = createRoot(container);
  (container as any)._reactRoot = root;
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
