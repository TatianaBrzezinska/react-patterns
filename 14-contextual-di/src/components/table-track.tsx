import { Track } from "../App";
import styles from "./table-track.module.css";

export function TableTrack({
  track,
  actions,
}: {
  track: Track;
  actions: React.ReactNode;
}) {
  return (
    <div className={styles.track}>
      <div className={styles.trackContent}>
        <span className={styles.trackName}>{track.name}</span>
        <span className={styles.trackHours}>{track.hours}h</span>
      </div>
      <div className={styles.trackActions}>{actions}</div>
    </div>
  );
}
