import { Track } from "@/interfaces/track";

export function useTableComputing({ tracks }: { tracks: Track[] }) {
  const getDayTracks = (day: number, task: string) => {
    return tracks.filter((track) => {
      const trackDate = new Date(track.date);
      return trackDate.getDate() === day && track.task === task;
    });
  };

  const getDayTotal = (day: number) => {
    return tracks
      .filter((track) => {
        const trackDate = new Date(track.date);
        return trackDate.getDate() === day;
      })
      .reduce((sum, track) => sum + track.hours, 0);
  };

  const getTaskTotal = (task: string) => {
    return tracks
      .filter((track) => {
        return track.task === task;
      })
      .reduce((sum, track) => sum + track.hours, 0);
  };

  const getTotal = () => {
    return tracks.reduce((sum, track) => sum + track.hours, 0);
  };

  return {
    getDayTracks,
    getDayTotal,
    getTaskTotal,
    getTotal,
  };
}
