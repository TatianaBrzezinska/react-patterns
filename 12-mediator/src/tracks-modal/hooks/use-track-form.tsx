import { useEffect, useState } from "react";
import { Track } from "../../hooks/use-tracks";

export function useTrackForm({
  selectedMonth,
  selectedYear,
  selectedCell,
  selectedTrack,

  trackCreate,
  trackUpdate,
}: {
  selectedCell: {
    day: number;
    task: string;
  } | null;
  selectedTrack: Track | null;
  selectedMonth: number;
  selectedYear: number;
  trackCreate: (track: Omit<Track, "id">) => void;
  trackUpdate: (track: Track) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    task: "",
    hours: 0,
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (selectedTrack) {
      setFormData({
        name: selectedTrack.name,
        task: selectedTrack.task,
        hours: selectedTrack.hours,
        date: selectedTrack.date,
      });
    } else if (selectedCell) {
      setFormData((prev) => ({
        ...prev,
        task: selectedCell.task,
        date: `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(selectedCell.day).padStart(2, "0")}`,
      }));
    } else {
      setFormData({
        name: "",
        task: "",
        hours: 0,
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [selectedCell, selectedMonth, selectedYear, selectedTrack]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "hours" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCell && selectedTrack) {
      trackUpdate({
        ...selectedTrack,
        name: formData.name,
        task: formData.task,
        hours: formData.hours,
        date: formData.date,
      });
    } else {
      trackCreate({
        name: formData.name,
        task: formData.task,
        hours: formData.hours,
        date: formData.date,
      });
    }
  };

  const isEdit = selectedTrack !== null;

  return {
    formData,
    handleInputChange,
    handleSubmit,

    isEdit,
  };
}
