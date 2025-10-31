import { memo, useEffect, useState } from "react";
import styles from "./example.module.css";
import { configureSlots, withSlot } from "./slot";
import clsx from "clsx";

const CardS = configureSlots<
  "header" | "content" | "actions",
  {
    actions: { className: string };
  }
>();

// Card Component
const Card = withSlot(
  memo(function Card() {
    console.log("Card rendered");
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <CardS.Slot name="header" />
        </div>
        <div className={styles.cardContent}>
          <CardS.Slot name="content" />
        </div>
        <CardS.Slot name="actions" className={styles.cardActions} />
      </div>
    );
  })
);

const Header = memo(function Header() {
  console.log("Header rendered");
  return (
    <div className={styles.titleRow}>
      <h2>Welcome Back!</h2>
      <button className={styles.iconButton}>⚙️</button>
    </div>
  );
});

const Content = memo(function Content() {
  console.log("Content rendered");
  return (
    <div className={styles.contentArea}>
      <p>
        This is a simple card component that uses slots for flexible layout.
      </p>
      <p>You can customize the header, content, and actions independently.</p>
    </div>
  );
});

const Actions = memo(function Actions({ className }: { className: string }) {
  console.log("Actions rendered");
  return (
    <div className={clsx(styles.buttonRow, className)}>
      <button className={styles.button}>Cancel</button>
      <button className={`${styles.button} ${styles.primary}`}>Continue</button>
    </div>
  );
});

// Example Usage
export function RealSlotsExample() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  }, [count]);
  return (
    <div className={styles.container}>
      <Card>
        <CardS.Template name="header">
          <Header />
        </CardS.Template>
        <CardS.Template name="content">
          <Content />
        </CardS.Template>
        <CardS.Template name="actions">
          {(value) => <Actions {...value} />}
        </CardS.Template>
      </Card>
    </div>
  );
}
