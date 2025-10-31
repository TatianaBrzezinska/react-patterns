import { useId, useState } from "react";
import styles from "./home-work.module.css";

/** TODO Домашнее задание
 *
 * Создайте переиспользуемый хук useTooltip, который будет управлять состоянием и поведением всплывающих подсказок.
 *
 * **Используйте паттерн Props Getter.**
 * В результате добавлять тултипы должно быть легко при сохранении простоты кастомизации отображения.
 *
 * Ваш хук должен принимать следующие параметры:
 * - `placement` - направление всплывающей подсказки.
 * - `offset` - отступ от целевого элемента.
 * - `delay` - задержка в миллисекундах перед отображением всплывающей подсказки.
 *
 */

interface TooltipState {
  isVisible: boolean;
  position: {
    x: number;
    y: number;
  };
}

interface UseTooltipProps {
  placement?: "top" | "bottom" | "left" | "right";
  offset?: number;
  delay?: number;
}

const placement = "bottom" as UseTooltipProps["placement"];
const offset = 8;
const delay = 200;

// Example usage
export function PropsGetterHomeWork() {
  const [state, setState] = useState<TooltipState>({
    isVisible: false,
    position: { x: 0, y: 0 },
  });

  const tooltipId = useId();
  let showTimeout: number;

  const calculatePosition = (target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const tooltipElement = document.querySelector(
      `.${styles.tooltip}`
    ) as HTMLElement;
    if (!tooltipElement) return { x: 0, y: 0 };

    const tooltipRect = tooltipElement.getBoundingClientRect();
    const targetCenterX = rect.left + rect.width / 2;
    const targetCenterY = rect.top + rect.height / 2;

    let x = 0;
    let y = 0;

    switch (placement) {
      case "top":
        x = targetCenterX - tooltipRect.width / 2;
        y = rect.top - tooltipRect.height - offset;
        break;
      case "bottom":
        x = targetCenterX - tooltipRect.width / 2;
        y = rect.bottom + offset;
        break;
      case "left":
        x = rect.left - tooltipRect.width - offset;
        y = targetCenterY - tooltipRect.height / 2;
        break;
      case "right":
        x = rect.right + offset;
        y = targetCenterY - tooltipRect.height / 2;
        break;
    }

    return { x, y };
  };

  const showTooltip = (e: React.MouseEvent | React.FocusEvent) => {
    const target = e.currentTarget as HTMLElement;
    showTimeout = window.setTimeout(() => {
      setState({
        isVisible: true,
        position: calculatePosition(target),
      });
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(showTimeout);
    setState((prev) => ({
      ...prev,
      isVisible: false,
    }));
  };

  return (
    <div className={styles.container}>
      <h1>Tooltip Examples</h1>

      <div className={styles.examples}>
        <div className={styles.example}>
          <button
            className={styles.button}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
            aria-describedby={tooltipId}
          >
            Hover me (Rich Content)
          </button>
          <div
            id={tooltipId}
            role="tooltip"
            className={`${styles.tooltip} ${styles[`tooltip-${placement}`]}`}
            style={{
              transform: `translate(${state.position.x}px, ${state.position.y}px)`,
              opacity: state.isVisible ? 1 : 0,
              visibility: state.isVisible ? "visible" : "hidden",
            }}
          >
            <div>
              <strong>Rich Content Tooltip</strong>
              <p>With multiple lines and HTML</p>
              <ul>
                <li>Feature 1</li>
                <li>Feature 2</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
