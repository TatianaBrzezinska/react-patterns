import { Track } from "@/interfaces/track";
import { useFormData } from "../shared/use-form-data";

export function useAddTrackForm({
  trackCreate,
  onSubmit,
}: {
  trackCreate: (track: Omit<Track, "id">) => Promise<void>;
  onSubmit?: () => void;
}) {
  const { formData, handleInputChange, resetFormData } = useFormData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackCreate({
      name: formData.name,
      task: formData.task,
      hours: formData.hours,
      date: formData.date,
    }).finally(() => {
      resetFormData();
      onSubmit?.();
    });
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };
}
