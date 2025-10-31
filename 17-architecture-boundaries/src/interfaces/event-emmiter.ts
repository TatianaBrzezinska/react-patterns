import { useEffect } from "react";
import { TracksModalEvents } from "./tracks-modal-events";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class EventEmmiter<T extends Record<string, unknown>> {
  private events: Partial<Record<keyof T, ((data: unknown) => void)[]>> = {};

  on<K extends keyof T>(event: K, callback: (data: T[K]) => void) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback as (data: unknown) => void);
  }

  emit<K extends keyof T>(event: K, data: T[K]) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }

  off<K extends keyof T>(event: K, callback: (data: T[K]) => void) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(
        (cb) => cb !== callback
      ) as unknown as any;
    }
  }
}

type GlobalEvents = TracksModalEvents;

export const globalEventEmmiter = new EventEmmiter<GlobalEvents>();

export function useEvent<K extends keyof GlobalEvents>(
  event: K,
  callback: (data: GlobalEvents[K]) => void
) {
  useEffect(() => {
    globalEventEmmiter.on(event, callback);
    return () => {
      globalEventEmmiter.off(event, callback);
    };
  }, [event, callback]);
}
