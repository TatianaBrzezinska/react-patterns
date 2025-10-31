import { useState } from "react";
import styles from "./style.module.css";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

const API_URL = "http://localhost:3001";
export const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Check if user already exists
      const checkResponse = await fetch(
        `${API_URL}/users?email=${formData.email}`
      );
      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        throw new Error("User already exists");
      }

      // Create new user
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const newUser = await response.json();
      localStorage.setItem("userId", newUser.id.toString());
      window.location.reload();
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
