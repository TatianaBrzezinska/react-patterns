import { TrackCreateParams } from "@/kernel/track";
import { useEffect } from "react";
import { FormData } from "./types";

export function useSelectedCellEffect({
  createParams,
  setFormData,
  resetFormData,
}: {
  createParams: TrackCreateParams | null;
  setFormData: (formData: FormData) => void;
  resetFormData: () => void;
}) {
  useEffect(() => {
    if (createParams) {
      setFormData({
        name: "",
        date: `${createParams.selectedYear}-${String(
          createParams.selectedMonth + 1
        ).padStart(2, "0")}-${String(createParams.day).padStart(2, "0")}`,
        task: createParams.task,
        hours: createParams.hours ?? 0,
      });
    } else {
      resetFormData();
    }
  }, [createParams]);
}
