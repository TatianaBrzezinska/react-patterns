import styles from "./button.module.css";

type Props = {
  color?: "primary" | "secondary" | "danger";
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export function UiButton({
  color = "primary",
  variant = "solid",
  size = "md",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`${styles.root} ${styles[color]} ${styles[variant]} ${styles[size]}`}
    >
      {props.children}
    </button>
  );
}
