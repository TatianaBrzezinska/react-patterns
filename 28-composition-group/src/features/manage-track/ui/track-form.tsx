import { UiButton } from "@/shared/ui/button";
import { Track } from "@/kernel/track";
import styles from "./track-form.module.css";

export function TrackForm({
  formData,
  onInputChange,
  onSubmit,
  onCancel,
  submitText = "Add Track",
  disabled = {},
}: {
  formData: Omit<Track, "id">;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  submitText?: string;
  disabled?: {
    name?: boolean;
    task?: boolean;
    hours?: boolean;
    date?: boolean;
  };
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className={styles.form}
    >
      <div className={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          required
          disabled={disabled.name}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="task">Task:</label>
        <input
          type="text"
          id="task"
          name="task"
          value={formData.task}
          onChange={onInputChange}
          required
          disabled={disabled.task}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="hours">Hours:</label>
        <input
          type="number"
          id="hours"
          name="hours"
          value={formData.hours}
          onChange={onInputChange}
          min="0"
          step="0.001"
          required
          disabled={disabled.hours}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={onInputChange}
          required
          disabled={disabled.date}
        />
      </div>

      <div className={styles.buttonGroup}>
        <UiButton type="submit" className={styles.button}>
          {submitText}
        </UiButton>
        <UiButton
          type="button"
          color="secondary"
          className={styles.button}
          onClick={() => onCancel()}
          style={{ backgroundColor: "#6c757d" }}
        >
          Cancel
        </UiButton>
      </div>
    </form>
  );
}
