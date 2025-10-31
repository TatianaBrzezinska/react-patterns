import { useRef, useState } from "react";
import styles from "./example.module.css";
import clsx from "clsx";
import { createPortal } from "react-dom";

// Example Components

function Card({
  title,
  children,
  ref,
  className,
}: {
  title: string;
  children: React.ReactNode;
  // only react 19
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}) {
  return (
    <div className={clsx(className, styles.card)} ref={ref}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// Enhanced Components with Onboarding
const ProfileCard = ({
  ref,
  className,
}: {
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}) => {
  return (
    <Card title="Profile" ref={ref} className={className}>
      <form className={styles.form}>
        <input
          type="text"
          className={styles.input}
          placeholder="Name"
          defaultValue="John Doe"
        />
        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          defaultValue="john@example.com"
        />
        <button className={styles.button}>Update Profile</button>
      </form>
    </Card>
  );
};
const SettingsCard = ({
  ref,
  className,
}: {
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}) => {
  return (
    <Card title="Settings" ref={ref} className={className}>
      <div className={styles.form}>
        <label>
          <input type="checkbox" defaultChecked /> Email notifications
        </label>
        <label>
          <input type="checkbox" /> SMS alerts
        </label>
        <button className={styles.button}>Save Settings</button>
      </div>
    </Card>
  );
};
const NotificationsCard = ({
  ref,
  className,
}: {
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}) => {
  return (
    <Card title="Notifications" ref={ref} className={className}>
      <div>
        <p>You have 3 unread notifications</p>
        <button className={styles.button}>View All</button>
      </div>
    </Card>
  );
};

export function HocExample() {
  const [stepIndex, setStepIndex] = useState(-1);

  const startOnboarding = () => {
    setStepIndex(0);
  };

  const handleNext = () => {
    setStepIndex((prev) => prev + 1);
  };

  const handleSkip = () => {
    setStepIndex(3);
  };

  const tooltip0 = useTooltip({
    content:
      "Welcome to your user dashboard! Here you can manage your profile, settings, and notifications.",
    position: "bottom",
    handleNext,
    handleSkip,
    showTooltip: stepIndex === 0,
  });

  const tooltip1 = useTooltip({
    content: "Configure your account settings",
    position: "bottom",
    handleNext,
    handleSkip,
    showTooltip: stepIndex === 1,
  });

  const tooltip2 = useTooltip({
    content: "Check your notifications",
    position: "bottom",
    handleNext,
    handleSkip,
    showTooltip: stepIndex === 2,
    isLastStep: true,
  });

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>User Dashboard</h2>

      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        <ProfileCard {...tooltip0.target}></ProfileCard>
        <SettingsCard {...tooltip1.target}></SettingsCard>
        <NotificationsCard {...tooltip2.target}></NotificationsCard>
        {tooltip0.tooltip}
        {tooltip1.tooltip}
        {tooltip2.tooltip}
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={startOnboarding} className={styles.button}>
          Start Onboarding Tour
        </button>
      </div>
    </div>
  );
}

function useTooltip({
  position,
  showTooltip,
  content,
  handleNext,
  handleSkip,
  isLastStep = false,
}: {
  position: "top" | "bottom" | "left" | "right";
  content: React.ReactNode;
  showTooltip: boolean;
  handleNext: () => void;
  handleSkip: () => void;
  isLastStep?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return {
    target: {
      ref,
      className: showTooltip ? styles.highlight : "",
    },
    tooltip:
      showTooltip &&
      createPortal(
        <>
          <div className={styles.overlay} />
          <div
            className={`${styles.tooltip} ${styles[position]}`}
            style={{
              ...getTooltipPosition(ref.current, position),
            }}
          >
            <div className={styles.tooltipContent}>{content}</div>
            <div className={styles.tooltipButtons}>
              <button
                className={`${styles.tooltipButton} ${styles.skip}`}
                onClick={handleSkip}
              >
                Skip Tour
              </button>
              <button
                className={`${styles.tooltipButton} ${styles.next}`}
                onClick={handleNext}
              >
                {isLastStep ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </>,
        document.body
      ),
  };
}

// Helper function to calculate tooltip position
function getTooltipPosition(
  element: HTMLElement | null,
  position: "top" | "bottom" | "left" | "right"
) {
  if (!element) return {};

  const rect = element.getBoundingClientRect();
  const spacing = 12;

  switch (position) {
    case "top":
      return {
        bottom: `${window.innerHeight - rect.top + spacing}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: "translateX(-50%)",
      };
    case "bottom":
      return {
        top: `${rect.bottom + spacing}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: "translateX(-50%)",
      };
    case "left":
      return {
        right: `${window.innerWidth - rect.left + spacing}px`,
        top: `${rect.top + rect.height / 2}px`,
        transform: "translateY(-50%)",
      };
    case "right":
      return {
        left: `${rect.right + spacing}px`,
        top: `${rect.top + rect.height / 2}px`,
        transform: "translateY(-50%)",
      };
  }
}
