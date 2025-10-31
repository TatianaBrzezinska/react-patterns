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
import { useTracksModalOpen } from "./tracks-modal/shared/use-tracks-modal-open";
import { TableLayout } from "./components/table-layout";
import { ActionButton } from "./components/action-button";
import { TrackModalProvider } from "./tracks-modal/shared/track-modal-provider";
import { AddTrackModal } from "./tracks-modal/add-track/add-track-modal";
import { AddTrackToCellModal } from "./tracks-modal/add-track-to-cell/add-track-to-cell-modal";
import { UpdateTrackModal } from "./tracks-modal";

export interface Track {
  id: string;
  name: string;
  task: string;
  hours: number;
  date: string;
}

const AppContent = () => {
  const { trackCreate, trackDelete, trackUpdate, tracks } = useTracks();
  const { filteredTracks, filters, setFilters, visibleDays } = useTracksFilter({
    tracks,
  });

  const { uniqueTasks } = useTasks({
    tracks: filteredTracks,
  });

  const { getDayTotal, getDayTracks, getTaskTotal, getTotal } =
    useTableComputing({ tracks: filteredTracks });

  const { cellClick, createClick, trackClick } = useTracksModalOpen();
  return (
    <TableLayout>
      <TracksFilters
        {...filters}
        {...setFilters}
        actions={<ActionButton onClick={createClick}>Add Track</ActionButton>}
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
                onCellClick={() => cellClick({
                  ...filters,
                  day,
                  task
                })}
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

      <AddTrackModal trackCreate={trackCreate}/>
      <AddTrackToCellModal trackCreate={trackCreate} />
      <UpdateTrackModal trackUpdate={trackUpdate} />
    </TableLayout>
  );
};

export default function App() {
  return (
    <TrackModalProvider>
      <AppContent />
    </TrackModalProvider>
  );
}
