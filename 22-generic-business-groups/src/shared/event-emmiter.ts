import { useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class EventEmmiter<T extends Record<string, unknown>> {
  private events: Partial<Record<keyof T, ((data: unknown) => void)[]>> = {};

  on<K extends keyof T>(event: K, callback: (data: T[K]) => void) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback as (data: unknown) => void);
  }

  bindEmit<K extends keyof T>(event: K) {
    return (data: T[K]) => {
      this.emit(event, data);
    };
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

  useEvent = <K extends keyof T>(event: K, callback: (data: T[K]) => void) => {
    useEffect(() => {
      this.on(event, callback);
      return () => {
        this.off(event, callback);
      };
    }, [event, callback]);
  };
}
