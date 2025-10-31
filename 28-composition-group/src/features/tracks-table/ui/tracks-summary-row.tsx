export function TracksSummaryRow({
  days,
  total,
}: {
  days: { day: number; hours: number }[];
  total: number;
}) {
  return (
    <tr>
      <td>Total</td>
      {days.map((day) => (
        <td key={`total-${day.day}`}>{day.hours}</td>
      ))}
      <td>{total}</td>
    </tr>
  );
}
