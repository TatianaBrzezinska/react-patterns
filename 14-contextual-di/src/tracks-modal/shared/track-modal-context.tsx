import { createContext, useContext } from "react";

import { useTrackModal } from "./use-track-modal";

type TrackModalContext = ReturnType<typeof useTrackModal>;
export const trackModalContext = createContext<TrackModalContext | null>(null);

export const useTrackModalContext = () => {
  const context = useContext(trackModalContext);
  if (!context) {
    throw new Error("useTrackModal must be used within a TrackModalProvider");
  }
  return context;
};
