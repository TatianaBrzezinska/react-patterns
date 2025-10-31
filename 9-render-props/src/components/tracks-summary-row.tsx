export function TracksSummaryRow({
  getMonthTotal,
  getVisibleDays,
  getDayTotal,
}: {
  getMonthTotal: () => number;
  getVisibleDays: () => number[];
  getDayTotal: (day: number) => number;
}) {
  return (
    <tr>
      <td>Total</td>
      {getVisibleDays().map((day) => (
        <td key={`total-${day}`}>{getDayTotal(day)}</td>
      ))}
      <td>{getMonthTotal()}</td>
    </tr>
  );
}
