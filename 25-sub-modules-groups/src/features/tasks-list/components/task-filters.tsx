import React from 'react';
import styles from './task-filters.module.css';

type FilterStatus = 'all' | 'active' | 'done';

interface TaskFiltersProps {
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filterStatus,
  onFilterChange,
}) => {
  return (
    <div className={styles.filterContainer}>
      <button
        className={`${styles.filterButton} ${
          filterStatus === 'all' ? styles.active : ''
        }`}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button
        className={`${styles.filterButton} ${
          filterStatus === 'active' ? styles.active : ''
        }`}
        onClick={() => onFilterChange('active')}
      >
        Active
      </button>
      <button
        className={`${styles.filterButton} ${
          filterStatus === 'done' ? styles.active : ''
        }`}
        onClick={() => onFilterChange('done')}
      >
        Completed
      </button>
    </div>
  );
};
