import { TracksActions } from "../ui/tracks-actions";
import { TracksCell } from "../ui/tracks-cell";
import { TracksTaskRow } from "../ui/tracks-task-row";
import { TableTrack } from "../ui/table-track";
import { TracksSummaryRow } from "../ui/tracks-summary-row";
import { TracksDayHeadCell } from "../ui/tracks-day-head-cell";
import { TracksTableLayout } from "../ui/tracks-table-layout";
import { useTracksFilter } from "../model/use-tracks-filter";
import { TracksFilters } from "../ui/tracks-filters";
import { globalEventEmmiter } from "@/kernel/events";
import { UiButton } from "@/shared/ui/button";
import { useTracks } from "@/services/track";
import { computeTable } from "../domain/track";

export const TracksTable = () => {
  const { trackDelete, tracks } = useTracks();
  const { filters, setFilters } = useTracksFilter();

  const table = computeTable(tracks, filters, filters.hideWeekends);

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
        renderDays={(currentDayRef) =>
          table.header.days.map((day) => (
            <TracksDayHeadCell
              key={day}
              day={day}
              {...filters}
              currentDayRef={currentDayRef}
            />
          ))
        }
        tasks={table.rows.map((row) => (
          <TracksTaskRow
            key={row.task}
            total={row.total}
            task={row.task}
            days={row.days.map((cell) => (
              <TracksCell
                key={cell.day}
                isTracks={cell.tracks.length > 0}
                onClick={() =>
                  cellClick({
                    ...filters,
                    day: cell.day,
                    task: row.task,
                  })
                }
                tracks={cell.tracks.map((track) => (
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
        ))}
        summary={
          <TracksSummaryRow
            total={table.summary.total}
            days={table.summary.days}
          />
        }
      />
    </>
  );
};
