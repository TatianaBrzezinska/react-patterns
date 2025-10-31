export function TracksTaskRow({
  task,
  days,
  total,
}: {
  task: string;
  days: React.ReactNode;
  total: number;
}) {
  return (
    <tr key={task}>
      <td>{task}</td>
      {days}
      <td>{total}</td>
    </tr>
  );
}
