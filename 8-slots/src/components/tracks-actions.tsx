import { Track } from "../App";
import styles from "./tracks-actions.module.css";

export function TracksActions({
  handleUpdateTrack,
  handleDeleteTrack,
  track,
}: {
  track: Track;
  handleUpdateTrack: (e: React.MouseEvent, track: Track) => void;
  handleDeleteTrack: (e: React.MouseEvent, trackId: string) => void;
}) {
  return (
    <>
      <button
        className={styles.actionButton}
        onClick={(e) => handleUpdateTrack(e, track)}
        title="Edit"
      >
        ✎
      </button>
      <button
        className={`${styles.actionButton} ${styles.deleteButton}`}
        onClick={(e) => handleDeleteTrack(e, track.id)}
        title="Delete"
      >
        ×
      </button>
    </>
  );
}
