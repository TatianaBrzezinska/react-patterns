import { useEffect } from "react";
import { Track } from "@/tracks-table";
import { useFormData } from "../shared/use-form-data";
import { SelectedCell } from "../shared/types";

export function useAddTrackToCell({
  trackCreate,
  onSubmit,
  selectedCell,
}: {
  trackCreate: (track: Omit<Track, "id">) => Promise<void>;
  onSubmit?: () => void;
  selectedCell: SelectedCell | null;
}) {
  const { formData, handleInputChange, resetFormData, setFormData } =
    useFormData();

  useEffect(() => {
    if (selectedCell) {
      setFormData({
        name: "",
        date: `${selectedCell.selectedYear}-${String(
          selectedCell.selectedMonth + 1
        ).padStart(2, "0")}-${String(selectedCell.day).padStart(2, "0")}`,
        task: selectedCell.task,
        hours: selectedCell.hours ?? 0,
      });
    } else {
      resetFormData();
    }
  }, [selectedCell]);

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
