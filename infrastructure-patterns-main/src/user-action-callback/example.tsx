import { useState } from "react";
import styles from "./example.module.css";

interface ConfirmationState {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmationExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<ConfirmationState | null>(null);

  const handleDeleteClick = async () => {
    setState({
      title: "Delete Item",
      message: "Are you sure you want to delete this item?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    setIsOpen(true);
  };

  const handleSaveClick = async () => {
    setState({
      title: "Save Changes",
      message: "Are you sure you want to save the changes?",
      confirmText: "Save",
      cancelText: "Cancel",
    });
    setIsOpen(true);
  };

  if (!state) return null;

  return (
    <div style={{ maxWidth: "640px", margin: "2rem auto" }}>
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={handleDeleteClick}
        >
          Delete Item
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.saveButton}`}
          onClick={handleSaveClick}
        >
          Save Changes
        </button>
      </div>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div
            className={styles.dialog}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h2 className={styles.title}>{state.title}</h2>
            <p className={styles.message}>{state.message}</p>
            <div className={styles.actions}>
              <button
                type="button"
                className={`${styles.button} ${styles.secondaryButton}`}
                onClick={() => setIsOpen(false)}
              >
                {state.cancelText || "Cancel"}
              </button>
              <button
                type="button"
                className={`${styles.button} ${styles.primaryButton}`}
                onClick={() => setIsOpen(true)}
              >
                {state.confirmText || "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
