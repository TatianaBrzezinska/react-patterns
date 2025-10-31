import { Track } from "@/kernel/track";
import styles from "./tracks-actions.module.css";

export function TracksActions({
  onUpdateTrack,
  onDeleteTrack,
  track,
}: {
  track: Track;
  onUpdateTrack: (track: Track) => void;
  onDeleteTrack: (trackId: string) => void;
}) {
  return (
    <>
      <button
        className={styles.actionButton}
        onClick={(e) => {
          e.stopPropagation();
          onUpdateTrack(track);
        }}
        title="Edit"
      >
        ✎
      </button>
      <button
        className={`${styles.actionButton} ${styles.deleteButton}`}
        onClick={(e) => {
          e.stopPropagation();
          onDeleteTrack(track.id);
        }}
        title="Delete"
      >
        ×
      </button>
    </>
  );
}
