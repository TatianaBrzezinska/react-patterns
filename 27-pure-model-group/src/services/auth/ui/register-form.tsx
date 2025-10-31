import { useState } from "react";
import styles from "./style.module.css";
import { useAuth } from "../model/auth";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState<string>("");

  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className={styles.inputGroup}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={styles.inputGroup}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className={styles.inputGroup}
          required
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit" className={styles.button}>
        Register
      </button>
    </form>
  );
};
