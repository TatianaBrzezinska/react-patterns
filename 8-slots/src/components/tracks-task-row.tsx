export function TracksTaskRow({
  task,
  getTaskTotal,
  days,
}: {
  task: string;
  days: React.ReactNode;
  getTaskTotal: (task: string) => number;
}) {
  return (
    <tr key={task}>
      <td>{task}</td>
      {days}
      <td>{getTaskTotal(task)}</td>
    </tr>
  );
}
