import { createRoot } from "react-dom/client";
import { Router } from "wouter";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root element #root not found");

// BASE_URL keeps routing correct when the site is served from a sub-path
// (GitHub Pages project sites) as well as from the root (Vercel).
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

createRoot(container).render(
  <Router base={base}>
    <App />
  </Router>,
);
