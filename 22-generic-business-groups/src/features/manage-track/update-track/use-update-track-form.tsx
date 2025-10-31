import { useEffect } from "react";
import { Track } from "@/interfaces/track";
import { useFormData } from "../shared/use-form-data";

export function useUpdateTrackForm({
  selectedTrack,
  trackUpdate,
  onSubmit,
}: {
  selectedTrack: Track | null;
  trackUpdate: (track: Track) => Promise<void>;
  onSubmit?: () => void;
}) {
  const { formData, handleInputChange, resetFormData, setFormData } =
    useFormData();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedTrack) {
      trackUpdate({
        ...selectedTrack,
        name: formData.name,
        task: formData.task,
        hours: formData.hours,
        date: formData.date,
      }).finally(() => {
        resetFormData();
        onSubmit?.();
      });
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };
}
