import { Track } from "@/kernel/track";
import {
  DayOfMonth,
  DateSelection,
  getTracksBySelectedMonth,
  daysArray,
  isNotWeekend,
} from "./filters";

export type TaskIdentifier = string;

export type Table = {
  header: TableHeaderRow;
  rows: TableTaskRow[];
  summary: TableSummaryRow;
};

export type TableHeaderRow = {
  days: DayOfMonth[];
};

export type TableTaskRow = {
  task: TaskIdentifier;
  days: TableDayCell[];
  total: number;
};

export type TableSummaryRow = {
  days: TableSummaryCell[];
  total: number;
};

export type TableSummaryCell = {
  day: DayOfMonth;
  hours: number;
};

export type TableDayCell = {
  day: DayOfMonth;
  hours: number;
  tracks: Track[];
};

export function computeTable(
  tracks: Track[],
  daysSelection: DateSelection,
  hideWeekends: boolean
): Table {
  tracks = getTracksBySelectedMonth(tracks, daysSelection);

  let days = daysArray(daysSelection);

  if (hideWeekends) {
    days = days.filter((day) => isNotWeekend(daysSelection, day));
    tracks = tracks.filter((track) =>
      isNotWeekend(daysSelection, trackDay(track))
    );
  }

  const uniqueTasks = getUniqueTasks(tracks);
  const tracksByTasks = tracks.reduce(addTrackToTaskGroup, {});

  const rows = uniqueTasks.map((task) => {
    const taskTracks = tracksByTasks[task];
    const tasksByDays = taskTracks.reduce(addTrackToDayGroup, {});

    return {
      task,
      total: summTracks(taskTracks),
      days: days.map((day) => ({
        day: day,
        hours: summTracks(tasksByDays[day] ?? []),
        tracks: tasksByDays[day] ?? [],
      })),
    };
  });

  const tracksByDays = tracks.reduce(addTrackToDayGroup, {});

  const summary = days.map((day) => ({
    day: day,
    hours: summTracks(tracksByDays[day] ?? []),
  }));

  const total = summTracks(tracks);

  return {
    header: {
      days,
    },
    rows,
    summary: { days: summary, total },
  };
}

const summTracks = (tracks: Track[]) => {
  return tracks.reduce((acc, track) => acc + track.hours, 0);
};

export type TrackGroup = {
  [key: string]: Track[];
};
const addTrackToTaskGroup = (group: TrackGroup, track: Track) => {
  if (!group[track.task]) {
    group[track.task] = [];
  }
  group[track.task].push(track);
  return group;
};

export type DayGroup = {
  [key: number]: Track[];
};
const addTrackToDayGroup = (group: DayGroup, track: Track) => {
  if (!group[trackDay(track)]) {
    group[trackDay(track)] = [];
  }
  group[trackDay(track)].push(track);
  return group;
};

const getUniqueTasks = (tracks: Track[]): TaskIdentifier[] => {
  return [...new Set(tracks.map((track) => track.task))];
};

const trackDay = (track: Track) => new Date(track.date).getDay();
