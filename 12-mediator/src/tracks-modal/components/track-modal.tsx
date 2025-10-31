import styles from "./track-modal.module.css";

export function TrackModalView({
  isEdit,
  close,
  children,
}: {
  isEdit: boolean;
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
        <h2>{isEdit ? "Edit Track" : "Add Track"}</h2>
        {children}
      </div>
    </div>
  );
}
