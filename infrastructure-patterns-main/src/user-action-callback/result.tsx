import { createContext, useContext, useState, useTransition } from "react";
import styles from "./example.module.css";
import { createPortal } from "react-dom";

export function ConfirmationExample() {
  const confirmation = useConfirmation();

  const handleDeleteClick = async () => {
    const result = await confirmation.openAsync({
      title: "Delete Item",
      message: "Are you sure you want to delete this item?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (result.type === "close") {
      return;
    }

    const result2 = await confirmation.openAsync({
      title: "Are you sure?!!!!!",
      message: "Are you sure you want to delete this item?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    console.log(result2);
  };

  const handleSaveClick = async () => {
    const result = await confirmation.openAsync({
      title: "Save Changes",
      message: "Are you sure you want to save the changes?",
      confirmText: "Save",
      cancelText: "Cancel",
    });

    console.log(result);
  };

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
    </div>
  );
}

// INFRASTRUCTURE

type ConfirmationState = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
};

const ConfirmationContext = createContext<{
  open: (state: ConfirmationState) => void;
  openAsync: (
    state: ConfirmationState
  ) => Promise<{ type: "close" } | { type: "confirm" }>;
} | null>(null);

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error(
      "useConfirmation must be used within a ConfirmationProvider"
    );
  }
  return context;
};

export function ConfirmationModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<ConfirmationState | null>(null);

  const [isLoading, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      if (state?.onConfirm) {
        await state.onConfirm();
      }
      setIsOpen(false);
    });
  };

  const handleClose = () => {
    startTransition(() => {
      if (state?.onCancel) {
        state.onCancel();
      }
      setIsOpen(false);
    });
  };

  const open = (state: ConfirmationState) => {
    setState(state);
    setIsOpen(true);
  };

  const openAsync = async (state: ConfirmationState) => {
    return new Promise<{ type: "close" } | { type: "confirm" }>((resolve) => {
      open({
        ...state,
        onConfirm: async () => {
          await state.onConfirm?.();
          resolve({ type: "confirm" });
        },
        onCancel: async () => {
          await state.onCancel?.();
          resolve({ type: "close" });
        },
      });
    });
  };

  return (
    <ConfirmationContext
      value={{
        open,
        openAsync,
      }}
    >
      {children}
      {state &&
        isOpen &&
        createPortal(
          <div className={styles.overlay} onClick={handleClose}>
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
                  disabled={isLoading}
                  className={`${styles.button} ${styles.secondaryButton}`}
                  onClick={handleClose}
                >
                  {state.cancelText || "Cancel"}
                </button>
                <button
                  disabled={isLoading}
                  type="button"
                  className={`${styles.button} ${styles.primaryButton}`}
                  onClick={handleConfirm}
                >
                  {state.confirmText || "Confirm"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </ConfirmationContext>
  );
}
