import { TracksActions } from "../components/tracks-actions";
import { TracksCell } from "../components/tracks-cell";
import { TracksTaskRow } from "../components/tracks-task-row";
import { TableTrack } from "../components/table-track";
import { TracksSummaryRow } from "../components/tracks-summary-row";
import { TracksDayHeadCell } from "../components/tracks-day-head-cell";
import { TracksTableLayout } from "../components/tracks-table-layout";
import { useTracks } from "../hooks/use-tracks";
import { useTracksFilter } from "../hooks/use-tracks-filter";
import { TracksFilters } from "../components/tracks-filters";
import { useTracksTasks } from "../hooks/use-tracks-tasks";
import { useTableComputing } from "../hooks/use-table-comuting";
import { TableLayout } from "../components/table-layout";
import { globalEventEmmiter } from "@/interfaces/events";
import { UiButton } from "@/shared/ui/button";

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

  const cellClick = globalEventEmmiter.bindEmit("cellClick");
  const createClick = globalEventEmmiter.bindEmit("createClick");
  const trackClick = globalEventEmmiter.bindEmit("trackClick");
  return (
    <TableLayout>
      <TracksFilters
        {...filters}
        {...setFilters}
        actions={
          <UiButton size="md" onClick={() => createClick()}>
            Add Track
          </UiButton>
        }
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
