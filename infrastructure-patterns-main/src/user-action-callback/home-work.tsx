import { useCallback, useState } from "react";
import styles from "./home-work.module.css";

/**
 * Задание
 *
 * 1. Отделите логику тостов от пользовательского кода компонента ToastExample.
 *    (Используйте прошлый паттерн context-control)
 * 2. Реализуйте логику кнопок в тостах
 * 3. Попробуйте заменить callback на promise
 */

type ToastType = "success" | "error" | "info" | "warning";

interface ToastAction {
  label: string;
}

interface ToastOptions {
  id?: string;
  type?: ToastType;
  title: string;
  message: string;
  duration?: number;
  actions?: ToastAction[];
}

interface Toast extends Required<ToastOptions> {
  id: string;
}

export function ToastExample() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const createToast = useCallback((options: ToastOptions) => {
    const id = options.id || Math.random().toString(36).slice(2);
    const toast: Toast = {
      id,
      type: options.type || "info",
      title: options.title,
      message: options.message,
      duration: options.duration || 5000,
      actions:
        options.actions?.map((action) => ({
          ...action,
          onClick: () => {
            removeToast(id);
          },
        })) || [],
    };

    setToasts((prev) => [...prev, toast]);

    // Auto remove after duration
    if (toast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleUndoClick = async () => {
    createToast({
      type: "info",
      title: "Item Deleted",
      message: "The item has been moved to trash",
      actions: [
        {
          label: "Undo",
        },
      ],
    });
  };

  const handleRetryClick = async () => {
    createToast({
      type: "error",
      title: "Upload Failed",
      message: "Failed to upload your file. Please try again.",
      duration: 0, // Won't auto-dismiss
      actions: [
        {
          label: "Retry",
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <div style={{ maxWidth: "640px", margin: "2rem auto" }}>
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${styles.primaryButton}`}
          onClick={handleUndoClick}
        >
          Delete with Undo
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.primaryButton}`}
          onClick={handleRetryClick}
        >
          Failed Upload
        </button>
      </div>

      <div className={styles.toastContainer}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${styles.toast} ${styles[toast.type]}`}
            role="alert"
          >
            <div className={styles.content}>
              <h3 className={styles.title}>{toast.title}</h3>
              <p className={styles.message}>{toast.message}</p>
              {toast.actions.length > 0 && (
                <div className={styles.actions}>
                  {toast.actions.map((action, index) => (
                    <button key={index} type="button" className={styles.button}>
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => removeToast(toast.id)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
