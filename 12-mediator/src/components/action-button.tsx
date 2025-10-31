import styles from "./action-button.module.css";

export function ActionButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
