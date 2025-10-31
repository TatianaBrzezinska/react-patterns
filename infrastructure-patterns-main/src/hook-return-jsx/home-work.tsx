import { useState } from "react";
import styles from "./home-work.module.css";

/**
 * Отделите логику поиска от таблицы используя паттерн Hook Return JSX
 */

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

export function TableExample() {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = mockData.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.email.toLowerCase().includes(searchLower) ||
      item.role.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when search changes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div style={{ maxWidth: "960px", margin: "2rem auto" }}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name, email, or role..."
        />
        {searchTerm && (
          <button
            className={styles.clearSearch}
            onClick={() => handleSearch("")}
          >
            Clear
          </button>
        )}
      </div>

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
          {currentData.map((item) => (
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

      <div className={styles.pagination}>
        <div className={styles.pageInfo}>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)}{" "}
          of {filteredData.length} entries
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
    </div>
  );
}
