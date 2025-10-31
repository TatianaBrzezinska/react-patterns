import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export interface Track {
  id: string;
  name: string;
  task: string;
  hours: number;
  date: string;
}

export function useTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tracks");
      const data = await response.json();
      setTracks(data);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  const trackDelete = async (trackId: string) => {
    if (!window.confirm("Are you sure you want to delete this track?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/tracks/${trackId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchTracks();
      } else {
        console.error("Failed to delete track:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting track:", error);
    }
  };

  const trackUpdate = async (track: Track) => {
    try {
      const response = await fetch(`http://localhost:3000/tracks/${track.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(track),
      });

      if (response.ok) {
        fetchTracks();
      } else {
        console.error("Failed to save track:", await response.text());
      }
    } catch (error) {
      console.error("Error saving track:", error);
    }
  };

  const trackCreate = async (track: Omit<Track, "id">) => {
    try {
      const body = {
        ...track,
        id: nanoid(),
      };

      const response = await fetch("http://localhost:3000/tracks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        fetchTracks();
      } else {
        console.error("Failed to save track:", await response.text());
      }
    } catch (error) {
      console.error("Error saving track:", error);
    }
  };

  return {
    tracks,
    trackDelete,
    trackUpdate,
    trackCreate,
  };
}
