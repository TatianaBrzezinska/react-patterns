import { Track } from "@/interfaces/track";
import { useMemo } from "react";

export function useTracksTasks({ tracks }: { tracks: Track[] }) {
  const uniqueTasks = useMemo(
    () => Array.from(new Set(tracks.map((track) => track.task))),
    [tracks]
  );

  return {
    uniqueTasks,
  };
}
