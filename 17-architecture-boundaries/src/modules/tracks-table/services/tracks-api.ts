import { nanoid } from "nanoid";
import { TrackApi } from "../hooks/tracks-api-context";
import { Track } from "../hooks/use-tracks";

export const tracksApi: TrackApi = {
  fetchTracks: () => {
    return fetch("http://localhost:3001/tracks").then((response) =>
      response.json()
    );
  },
  deleteTrack: async (trackId: string) => {
    const response = await fetch(`http://localhost:3001/tracks/${trackId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete track");
    }

    return response.json();
  },
  updateTrack: async (track: Track) => {
    const response = await fetch(`http://localhost:3001/tracks/${track.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(track),
    });

    if (!response.ok) {
      throw new Error("Failed to update track");
    }

    return response.json();
  },
  createTrack: async (track: Omit<Track, "id">) => {
    const response = await fetch("http://localhost:3001/tracks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(track),
    });

    if (!response.ok) {
      throw new Error("Failed to create track");
    }

    return response.json();
  },
};

const generateTracks = (count: number): Track[] => {
  const tracks: Track[] = [];
  for (let i = 0; i < count; i++) {
    tracks.push({
      id: nanoid(),
      name: `Task ${i + 1} Work`,
      task: "Development",
      hours: 4,
      date: new Date().toISOString().split("T")[0],
    });
  }
  return tracks;
};

export const mockTracksApi: TrackApi = {
  fetchTracks: () => Promise.resolve(generateTracks(10)),
  deleteTrack: () => Promise.resolve(),
  updateTrack: () => Promise.resolve(),
  createTrack: () => Promise.resolve(),
};
