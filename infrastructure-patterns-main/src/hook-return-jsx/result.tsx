import { Dispatch, SetStateAction, useState } from "react";
import styles from "./example.module.css";

const mockData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User" },
  { id: 6, name: "Diana Miller", email: "diana@example.com", role: "Admin" },
  { id: 7, name: "Edward Davis", email: "edward@example.com", role: "User" },
  { id: 8, name: "Fiona Clark", email: "fiona@example.com", role: "Editor" },
  { id: 9, name: "George White", email: "george@example.com", role: "User" },
  { id: 10, name: "Helen Martin", email: "helen@example.com", role: "Admin" },
  { id: 11, name: "Ian Taylor", email: "ian@example.com", role: "Editor" },
  { id: 12, name: "Julia Adams", email: "julia@example.com", role: "User" },
];

const mockData2 = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
  { id: 4, name: "Alice Brown" },
  { id: 5, name: "Charlie Wilson" },
  { id: 6, name: "Diana Miller" },
  { id: 7, name: "Edward Davis" },
  { id: 8, name: "Fiona Clark" },
  { id: 9, name: "George White" },
  { id: 10, name: "Helen Martin" },
];

export function TableExample() {
  const { pagination, paginatedData } = usePagination(mockData, 5);
  const { pagination: pagination2, paginatedData: paginatedData2 } =
    usePagination(mockData2, 5);
  return (
    <div style={{ maxWidth: "960px", margin: "2rem auto" }}>
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
          {paginatedData.map((item) => (
            <tr key={item.id} className={styles.row}>
              <td className={styles.cell}>{item.id}</td>
              <td className={styles.cell}>{item.name}</td>
              <td className={styles.cell}>{item.email}</td>
              <td className={styles.cell}>
                <span
                  className={`${styles.badge} ${
                    styles[item.role.toLowerCase()]
                  }`}
                >
                  {item.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pagination}
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className={styles.headerCell}>ID</th>
            <th className={styles.headerCell}>Name</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData2.map((item) => (
            <tr key={item.id} className={styles.row}>
              <td className={styles.cell}>{item.id}</td>
              <td className={styles.cell}>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {pagination2}
    </div>
  );
}

function usePagination<T>(data: T[], pageSize = 10) {
  const { currentPage, endIndex, setCurrentPage, startIndex, totalPages } =
    usePaginationState(data, pageSize);
  return {
    pagination: (
      <Pagination
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    ),
    paginatedData: data.slice(startIndex, endIndex),
  };
}

function usePaginationState<T>(data: T[], pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
  };
}

function Pagination({
  startIndex,
  endIndex,
  currentPage,
  setCurrentPage,
  totalPages,
}: {
  startIndex: number;
  totalPages: number;
  endIndex: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className={styles.pagination}>
      <div className={styles.pageInfo}>
        Showing {startIndex + 1} to {Math.min(endIndex, mockData.length)} of{" "}
        {mockData.length} entries
      </div>
      <div className={styles.pageButtons}>
        <button
          className={styles.pageButton}
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            className={`${styles.pageButton} ${
              currentPage === number ? styles.active : ""
            }`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={styles.pageButton}
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
