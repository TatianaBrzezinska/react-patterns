import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RealSlotsExample } from "./real-slots/result";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RealSlotsExample />
  </StrictMode>
);
