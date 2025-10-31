import { Track } from "@/kernel/track";
import { useEffect } from "react";
import { FormData } from "./types";

export function useSelectedTrackEffect({
  selectedTrack,
  setFormData,
  resetFormData,
}: {
  selectedTrack: Track | null;
  setFormData: (formData: FormData) => void;
  resetFormData: () => void;
}) {
  useEffect(() => {
    if (selectedTrack) {
      setFormData({
        name: selectedTrack.name,
        task: selectedTrack.task,
        hours: selectedTrack.hours,
        date: selectedTrack.date,
      });
    } else {
      resetFormData();
    }
  }, [selectedTrack]);
}
