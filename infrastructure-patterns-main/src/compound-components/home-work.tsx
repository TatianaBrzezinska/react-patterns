import { useEffect, useState } from "react";
import styles from "./home-work.module.css";

/**
 * Задание 1.
 *
 * Напишите компонент Modal, который будет использоваться в других местах приложения.
 *
 * Сделайте его гибким и настраиваемым за счёт использования:
 * **Compound Components**
 *
 * Имплементируйте ещё одну модалку,
 * что бы проверить возможности переиспользуемости компонентов.
 */

export function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return (
      <div style={{ padding: "2rem" }}>
        <button
          onClick={() => setIsOpen(true)}
          className={`${styles.button} ${styles.primaryButton}`}
        >
          Open Modal
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`${styles.modal} ${isOpen ? styles.modalVisible : ""}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.header}>
            <h2 className={styles.title}>Confirm Action</h2>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className={styles.content}>
            <p>Are you sure you want to perform this action?</p>
            <p>This action cannot be undone.</p>
          </div>

          <div className={styles.footer}>
            <button
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={() => {
                console.log("Confirmed!");
                setIsOpen(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
