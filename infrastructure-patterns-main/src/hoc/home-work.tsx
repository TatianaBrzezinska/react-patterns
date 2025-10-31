import { Suspense, use } from "react";
import styles from "./home-work.module.css";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

// Types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

/**
 * Используй паттерн HOC, что бы убрать логику
 * загрузки данных и обработки ошибок из пользовательского кода
 *
 * **Важно**: без модификации компонента UsersRows
 */

const usersPromise = new Promise<User[]>((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() < 0.3) {
      reject(new Error("Failed to fetch users"));
    }
    resolve([
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
      {
        id: 4,
        name: "Alice Brown",
        email: "alice@example.com",
        role: "Editor",
      },
      {
        id: 5,
        name: "Charlie Wilson",
        email: "charlie@example.com",
        role: "User",
      },
    ]);
  }, 3000);
});

// Base Table Component
export function HocExample() {
  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr>
          <th className={styles.headerCell}>ID</th>
          <th className={styles.headerCell}>Name</th>
          <th className={styles.headerCell}>Email</th>
          <th className={styles.headerCell}>Role</th>
        </tr>
      </thead>
      <tbody>
        <Suspense
          fallback={Array.from({ length: 5 }).map((_, index) => (
            <SkeletonRow key={index} />
          ))}
        >
          <ErrorBoundary FallbackComponent={ErrorComponent}>
            <UsersRows usersPromise={usersPromise} />
          </ErrorBoundary>
        </Suspense>
      </tbody>
    </table>
  );
}

const UsersRows = ({ usersPromise }: { usersPromise: Promise<User[]> }) => {
  const users = use(usersPromise);

  return (
    <>
      {users.map((user) => (
        <tr key={user.id} className={styles.row}>
          <td className={styles.cell}>{user.id}</td>
          <td className={styles.cell}>{user.name}</td>
          <td className={styles.cell}>{user.email}</td>
          <td className={styles.cell}>
            <span
              className={`${styles.badge} ${styles[user.role.toLowerCase()]}`}
            >
              {user.role}
            </span>
          </td>
        </tr>
      ))}
    </>
  );
};

// Skeleton Row Component
const SkeletonRow = () => (
  <tr className={styles.row}>
    <td className={styles.cell}>
      <div className={`${styles.skeleton} ${styles.skeletonShort}`} />
    </td>
    <td className={styles.cell}>
      <div className={styles.skeleton} />
    </td>
    <td className={styles.cell}>
      <div className={styles.skeleton} />
    </td>
    <td className={styles.cell}>
      <div className={`${styles.skeleton} ${styles.skeletonShort}`} />
    </td>
  </tr>
);

const ErrorComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  if (!error) return null;

  return (
    <div className={styles.error}>
      <div>Error: {error.message}</div>
      <button className={styles.retryButton} onClick={resetErrorBoundary}>
        Retry
      </button>
    </div>
  );
};
