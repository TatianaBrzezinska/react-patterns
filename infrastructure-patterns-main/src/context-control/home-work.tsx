import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import styles from "./home-work.module.css";

/**
 * Задание
 *
 * Используйте паттерн Context Control для имплементации управления модальным окном
 * Реальзуйте кнопки `Open Modal` `Cancel`  и `Confirm`
 *
 * **Важно** не выносите состояние открытости модалки за пределы компонента Modal
 */
export function ModalExample() {
  return (
    <Modal>
      <button className={styles.button}>Open Modal</button>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Confirm Action</ModalTitle>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to perform this action?</p>
          <p>This action cannot be undone.</p>
        </ModalBody>
        <ModalFooter>
          <button className={`${styles.button} ${styles.secondaryButton}`}>
            Cancel
          </button>
          <button
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={() => {
              console.log("Confirmed!");
            }}
          >
            Confirm
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const ModalContext = createContext({
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsOpen: (_: boolean) => {},
});

export function Modal({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalContent({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useContext(ModalContext);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    isOpen && (
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
          {children}
        </div>
      </div>
    )
  );
}

export function ModalHeader({ children }: { children: ReactNode }) {
  return <div className={styles.header}>{children}</div>;
}

export function ModalTitle({ children }: { children: ReactNode }) {
  return <h2 className={styles.title}>{children}</h2>;
}

export function ModalCloseButton() {
  const { setIsOpen } = useContext(ModalContext);
  return (
    <button
      type="button"
      className={styles.closeButton}
      onClick={() => setIsOpen(false)}
      aria-label="Close"
    >
      ×
    </button>
  );
}

export function ModalBody({ children }: { children: ReactNode }) {
  return <div className={styles.content}>{children}</div>;
}

export function ModalFooter({ children }: { children: ReactNode }) {
  return <div className={styles.footer}>{children}</div>;
}
