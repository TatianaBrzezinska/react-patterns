import styles from "./track-modal.module.css";

export function TrackModalView({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={styles.modalOverlay}
      onClick={() => {
        close();
      }}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
