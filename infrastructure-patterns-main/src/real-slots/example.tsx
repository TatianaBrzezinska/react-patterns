import { memo, useEffect, useState } from "react";
import styles from "./example.module.css";
import clsx from "clsx";

// Card Component
const Card = memo(function Card({
  header,
  content,
  renderActions,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
  renderActions: (value: { className: string }) => React.ReactNode;
}) {
  console.log("Card rendered");
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>{header}</div>
      <div className={styles.cardContent}>{content}</div>
      {renderActions({ className: styles.cardActions })}
    </div>
  );
});

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
      <Card
        content={<Content />}
        header={<Header />}
        renderActions={(value) => <Actions {...value} />}
      />
    </div>
  );
}
