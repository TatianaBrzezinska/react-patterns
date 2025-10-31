import styles from "./tracks-cell.module.css";

export function TracksCell({
  onClick,
  tracks,
  isTracks,
}: {
  isTracks: boolean;
  onClick: () => void;
  tracks: React.ReactNode;
}) {
  return (
    <td className={styles.cell} onClick={onClick}>
      {(() => {
        if (!isTracks) {
          return <div className={styles.emptyCell}>-</div>;
        }
        return <div className={styles.trackList}>{tracks}</div>;
      })()}
    </td>
  );
}
