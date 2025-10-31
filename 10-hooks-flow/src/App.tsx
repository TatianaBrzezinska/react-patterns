import { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import styles from "./App.module.css";
import { TracksActions } from "./components/tracks-actions";
import { TracksCell } from "./components/tracks-cell";
import { TracksTaskRow } from "./components/tracks-task-row";
import { TableTrack } from "./components/table-track";
import { TracksSummaryRow } from "./components/tracks-summary-row";
import { TracksDayHeadCell } from "./components/tracks-day-head-cell";
import { TracksTable } from "./components/tracks-table";
import { useTracks } from "./hooks/use-tracks";
import { useTracksFilter } from "./hooks/use-tracks-filter";
import { TracksFilters } from "./components/tracks-filters";
import { useTasks } from "./hooks/use-tasks";
import { useTableComputing } from "./hooks/use-table-comuting";
import { useTrackForm } from "./hooks/use-track-form";
import { useTrackModal } from "./hooks/use-track-modal";

export interface Track {
  id: string;
  name: string;
  task: string;
  hours: number;
  date: string;
}

const App = () => {
  const { trackCreate, trackDelete, trackUpdate, tracks } = useTracks();
  const { filteredTracks, filters, setFilters, visibleDays } = useTracksFilter({
    tracks,
  });

  const { uniqueTasks } = useTasks({
    tracks: filteredTracks,
  });

  const { getDayTotal, getDayTracks, getTaskTotal, getTotal } =
    useTableComputing({ tracks: filteredTracks });

  const {
    cellClick,
    close,
    createClick,
    isOpenModal,
    selectedCell,
    selectedTrack,
    trackClick,
  } = useTrackModal();

  const { formData, handleInputChange, handleSubmit } = useTrackForm({
    ...filters,
    selectedCell,
    selectedTrack,
    trackCreate,
    trackUpdate,
  });

  return (
    <div className={styles.container}>
      <TracksFilters
        {...filters}
        {...setFilters}
        actions={
          <button className={styles.button} onClick={() => createClick()}>
            Add Track
          </button>
        }
      />

      <TracksTable
        tasks={uniqueTasks}
        renderDays={(currentDayRef) =>
          visibleDays.map((day) => (
            <TracksDayHeadCell
              key={day}
              day={day}
              {...filters}
              currentDayRef={currentDayRef}
            />
          ))
        }
        renderTask={(task) => (
          <TracksTaskRow
            key={task}
            getTaskTotal={getTaskTotal}
            task={task}
            days={visibleDays.map((day) => (
              <TracksCell
                key={`${day}-${task}`}
                day={day}
                task={task}
                getDayTracks={getDayTracks}
                onCellClick={cellClick}
                tracks={getDayTracks(day, task).map((track) => (
                  <TableTrack
                    key={track.id}
                    track={track}
                    actions={
                      <TracksActions
                        track={track}
                        onUpdateTrack={trackClick}
                        onDeleteTrack={trackDelete}
                      />
                    }
                  />
                ))}
              />
            ))}
          />
        )}
        summary={
          <TracksSummaryRow
            getMonthTotal={getTotal}
            visibleDays={visibleDays}
            getDayTotal={getDayTotal}
          />
        }
      ></TracksTable>

      {isOpenModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => {
            close();
          }}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedTrack ? "Edit Track" : "Add Track"}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="task">Task:</label>
                <input
                  type="text"
                  id="task"
                  name="task"
                  value={formData.task}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="hours">Hours:</label>
                <input
                  type="number"
                  id="hours"
                  name="hours"
                  value={formData.hours}
                  onChange={handleInputChange}
                  min="0"
                  step="0.5"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.button}>
                  {selectedTrack ? "Update" : "Add"} Track
                </button>
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => close()}
                  style={{ backgroundColor: "#6c757d" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
