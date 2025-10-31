import { EventEmmiter } from "@/shared/event-emmiter";
import { Track, TrackCreateParams } from "./track";

export type TracksModalEvents = {
  createTrackWithParams: TrackCreateParams;
  trackUpdate: Track;
  createTrack: void;
};

type GlobalEvents = TracksModalEvents;

export const globalEventEmmiter = new EventEmmiter<GlobalEvents>();
