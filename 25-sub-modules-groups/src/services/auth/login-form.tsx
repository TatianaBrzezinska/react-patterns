import { useState } from "react";

import styles from "./style.module.css";

interface LoginFormData {
  email: string;
  password: string;
}

const API_URL = "http://localhost:3001";
export const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // First, find the user by email
      const usersResponse = await fetch(
        `${API_URL}/users?email=${formData.email}`
      );
      const users = await usersResponse.json();

      if (users.length === 0 || users[0].password !== formData.password) {
        throw new Error("Invalid credentials");
      }

      const user = users[0];
      localStorage.setItem("userId", user.id.toString());
      window.location.reload();
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
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
        Login
      </button>
    </form>
  );
};
