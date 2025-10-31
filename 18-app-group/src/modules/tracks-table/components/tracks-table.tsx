import { TracksActions } from "./tracks-actions";
import { TracksCell } from "./tracks-cell";
import { TracksTaskRow } from "./tracks-task-row";
import { TableTrack } from "./table-track";
import { TracksSummaryRow } from "./tracks-summary-row";
import { TracksDayHeadCell } from "./tracks-day-head-cell";
import { TracksTableLayout } from "./tracks-table-layout";
import { useTracks } from "../hooks/use-tracks";
import { useTracksFilter } from "../hooks/use-tracks-filter";
import { TracksFilters } from "./tracks-filters";
import { useTracksTasks } from "../hooks/use-tracks-tasks";
import { useTableComputing } from "../hooks/use-table-comuting";
import { TableLayout } from "./table-layout";
import { ActionButton } from "./action-button";
import { globalEventEmmiter } from "@/interfaces/event-emmiter";

export const TracksTable = () => {
  const { trackDelete, tracks } = useTracks();
  const { filteredTracks, filters, setFilters, visibleDays } = useTracksFilter({
    tracks,
  });

  const { uniqueTasks } = useTracksTasks({
    tracks: filteredTracks,
  });

  const { getDayTotal, getDayTracks, getTaskTotal, getTotal } =
    useTableComputing({ tracks: filteredTracks });

  const cellClick = globalEventEmmiter.emit.bind(
    globalEventEmmiter,
    "cellClick"
  );

  const createClick = globalEventEmmiter.emit.bind(
    globalEventEmmiter,
    "createClick"
  );

  const trackClick = globalEventEmmiter.emit.bind(
    globalEventEmmiter,
    "trackClick"
  );
  return (
    <TableLayout>
      <TracksFilters
        {...filters}
        {...setFilters}
        actions={<ActionButton onClick={createClick}>Add Track</ActionButton>}
      />

      <TracksTableLayout
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
                onCellClick={() =>
                  cellClick({
                    ...filters,
                    day,
                    task,
                  })
                }
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
      />
    </TableLayout>
  );
};
