import { useTrackModalContext } from "./components/track-modal-context";

export function useTracksModalOpen() {
  const context = useTrackModalContext();

  return {
    createClick: context.createClick,
    cellClick: context.cellClick,
    trackClick: context.trackClick,
  };
}
