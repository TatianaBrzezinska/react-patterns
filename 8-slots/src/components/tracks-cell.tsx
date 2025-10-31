import { Track } from "../App";
import styles from "./tracks-cell.module.css";

export function TracksCell({
  getDayTracks,
  day,
  task,
  handleCellClick,

  tracks,
}: {
  getDayTracks: (day: number, task: string) => Track[];
  day: number;
  task: string;
  handleCellClick: (day: number, task: string) => void;
  tracks: React.ReactNode;
}) {
  return (
    <td
      key={`${day}-${task}`}
      className={styles.cell}
      onClick={() => handleCellClick(day, task)}
    >
      {(() => {
        const dayTracks = getDayTracks(day, task);
        if (dayTracks.length === 0) {
          return <div className={styles.emptyCell}>-</div>;
        }
        return <div className={styles.trackList}>{tracks}</div>;
      })()}
    </td>
  );
}
