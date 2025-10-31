import { createContext, use, useId, useState } from "react";
import styles from "./example.module.css";
import clsx from "clsx";

const TextFieldContext = createContext({
  id: "",
  error: false as React.ReactNode | boolean,
});

function TextField({
  children,
  className,
  error = false,
}: {
  children: React.ReactNode;
  className?: string;
  error?: React.ReactNode | boolean;
}) {
  const id = useId();
  return (
    <TextFieldContext.Provider value={{ id, error }}>
      <div className={clsx(styles.textField, className)}>{children}</div>
    </TextFieldContext.Provider>
  );
}

TextField.Lable = function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { id, error } = use(TextFieldContext);
  return (
    <label
      htmlFor={id}
      className={clsx(styles.label, className, error && styles.errorText)}
    >
      {children}
    </label>
  );
};

TextField.HelperText = function HelperText({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { error } = use(TextFieldContext);

  if (!children && !error) {
    return null;
  }

  return (
    <div
      className={clsx(styles.helperText, className, error && styles.errorText)}
    >
      {error ?? children}
    </div>
  );
};

TextField.Input = function Input({
  className,
  inputClassName,
  startAdornment,
  endAdornment,
  ...restInputProps
}: {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  className?: string;
  inputClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const { id, error } = use(TextFieldContext);
  return (
    <div className={clsx(styles.inputWrapper, className)}>
      {startAdornment && (
        <div className={styles.startAdornment}>{startAdornment}</div>
      )}
      <input
        id={id}
        className={clsx(
          styles.input,
          startAdornment && styles.hasStartAdornment,
          endAdornment && styles.hasEndAdornment,
          inputClassName,
          error && styles.error
        )}
        {...restInputProps}
      />
      {endAdornment && (
        <div className={styles.endAdornment}>{endAdornment}</div>
      )}
      <div className={styles.endAdornment}></div>
    </div>
  );
};

export function TextFieldExample() {
  const [email, setEmail] = useState("");

  return (
    <div style={{ maxWidth: "320px", margin: "2rem" }}>
      <TextField error="Error text">
        <TextField.Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          startAdornment={"@"}
          endAdornment={
            <button className={styles.button} onClick={() => setEmail("")}>
              Clear
            </button>
          }
        />
        <TextField.HelperText> Error text</TextField.HelperText>
      </TextField>
    </div>
  );
}
