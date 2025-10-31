import { useState } from "react";
import { SelectedCell } from "./types";
import { Track } from "./types";

export function useTrackModal() {
  const [isCreate, setIsCreate] = useState(false);
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const cellClick = (selectedCell: SelectedCell) => {
    setSelectedCell(selectedCell);
    setSelectedTrack(null); // Clear the selected track when a cell is clicked
    setIsCreate(true);
  };

  const trackClick = (track: Track) => {
    setSelectedCell(null); // Clear the selected cell when a track is clicked
    setSelectedTrack(track);
    setIsCreate(true);
  };

  const createClick = () => {
    setSelectedCell(null);
    setSelectedTrack(null);
    setIsCreate(true);
  };

  const isOpenModal =
    isCreate || selectedCell !== null || selectedTrack !== null;

  const close = () => {
    setSelectedCell(null);
    setSelectedTrack(null);
    setIsCreate(false);
  };

  return {
    selectedCell,
    selectedTrack,
    cellClick,
    trackClick,
    close,
    isOpenModal,
    createClick,
  };
}
