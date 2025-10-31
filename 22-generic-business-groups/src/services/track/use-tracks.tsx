import { nanoid } from "nanoid";
import { useEffect, useSyncExternalStore } from "react";
import { useTracksApi } from "./tracks-api-context";
import { Track } from "@/interfaces/track";
import { createGlobalStore } from "@/shared/global-store";

export const tracksStore = createGlobalStore<Track[]>([]);

export function useTracks({ shouldFetch = true } = {}) {
  const api = useTracksApi();
  const tracks = useSyncExternalStore(
    tracksStore.subscribe,
    tracksStore.getSnapshot
  );

  useEffect(() => {
    if (!shouldFetch || tracks.length > 0) {
      return;
    }
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    const data = await api.fetchTracks();
    tracksStore.set(data);
  };

  const trackDelete = async (trackId: string) => {
    if (!window.confirm("Are you sure you want to delete this track?")) {
      return;
    }
    await api.deleteTrack(trackId);
    fetchTracks();
  };

  const trackUpdate = async (track: Track) => {
    await api.updateTrack(track);
    fetchTracks();
  };

  const trackCreate = async (track: Omit<Track, "id">) => {
    const newTrack = { ...track, id: nanoid() };
    await api.createTrack(newTrack);
    fetchTracks();
  };

  return {
    tracks,
    trackDelete,
    trackUpdate,
    trackCreate,
  };
}
