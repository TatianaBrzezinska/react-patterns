import { useState } from "react";
import styles from "./example.module.css";

/** TODO: Convert this to use compound components pattern
 * Requirements:
 * 1. Create TextField component with subcomponents (Root, Label, Input, Helper)
 * 2. Implement context to share state
 * 3. Add support for error states
 * 4. Add support for input adornments
 * 5. Style all components properly
 */

export function TextFieldExample() {
  const [email, setEmail] = useState("");

  return (
    <div style={{ maxWidth: "320px", margin: "2rem" }}>
      <div className={styles.textField}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <div className={styles.inputWrapper}>
          <div className={styles.startAdornment}>@</div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`${styles.input} ${styles.hasStartAdornment} ${styles.hasEndAdornment}`}
          />
          <div className={styles.endAdornment}>
            <button className={styles.button} onClick={() => setEmail("")}>
              Clear
            </button>
          </div>
        </div>
        <div className={styles.helperText}>Please enter your email address</div>
      </div>
    </div>
  );
}
