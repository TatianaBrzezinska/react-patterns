import { TracksActions } from "../components/tracks-actions";
import { TracksCell } from "../components/tracks-cell";
import { TracksTaskRow } from "../components/tracks-task-row";
import { TableTrack } from "../components/table-track";
import { TracksSummaryRow } from "../components/tracks-summary-row";
import { TracksDayHeadCell } from "../components/tracks-day-head-cell";
import { TracksTableLayout } from "../components/tracks-table-layout";
import { useTracksFilter } from "../hooks/use-tracks-filter";
import { TracksFilters } from "../components/tracks-filters";
import { useTracksTasks } from "../hooks/use-tracks-tasks";
import { useTableComputing } from "../hooks/use-table-comuting";
import { globalEventEmmiter } from "@/kernel/events";
import { UiButton } from "@/shared/ui/button";
import { useTracks } from "@/services/track";

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

  const cellClick = globalEventEmmiter.bindEmit("createTrackWithParams");
  const createClick = globalEventEmmiter.bindEmit("createTrack");
  const trackClick = globalEventEmmiter.bindEmit("trackUpdate");
  return (
    <>
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
    </>
  );
};
