import { useState } from "react";
import { FormData } from "./types";

const defaultFormData: FormData = {
  name: "",
  task: "",
  hours: 0,
  date: new Date().toISOString().split("T")[0],
};

export function useFormData() {
  const [formData, setFormData] = useState(defaultFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "hours" ? parseFloat(value) || 0 : value,
    }));
  };

  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  return { formData, handleInputChange, resetFormData, setFormData };
}
