import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TracksApiProvider } from "./hooks/tracks-api-context.tsx";
import { mockTracksApi } from "./services/tracks-api.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TracksApiProvider value={mockTracksApi}>
      <App />
    </TracksApiProvider>
  </StrictMode>
);
