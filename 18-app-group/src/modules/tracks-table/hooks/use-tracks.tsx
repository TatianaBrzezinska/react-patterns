import { nanoid } from "nanoid";
import { useEffect, useSyncExternalStore } from "react";
import { useTracksApi } from "./tracks-api-context";

export interface Track {
  id: string;
  name: string;
  task: string;
  hours: number;
  date: string;
}

const tracksStore = {
  value: [] as Track[],

  listeners: [] as (() => void)[],
  getSnapshot: () => {
    return tracksStore.value;
  },
  subscribe: (callback: () => void): (() => void) => {
    tracksStore.listeners.push(callback);
    return () => {
      tracksStore.listeners = tracksStore.listeners.filter(
        (listener) => listener !== callback
      );
    };
  },

  setTracks: (tracks: Track[]) => {
    tracksStore.value = tracks;
    tracksStore.listeners.forEach((listener) => listener());
  },
};

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
    tracksStore.setTracks(data);
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
