/**
 * @title {{{label}}}
 */
interface ScheduledEvent {
  label: string;
  time: string;
}

export interface Props {
  title: string;
  events: ScheduledEvent[];
}

export default function Schedule(props: Props) {
  return (
    <div class="bg-accent py-16 px-12 flex gap-16 justify-between">
      <h3 class="text-3xl">{props.title}</h3>
      <ul class="flex flex-col w-1/2 text-sm">
        {props.events.map(({ label, time }) => (
          <li class="flex justify-between items-center h-7 border-b border-black">
            <span>{label}</span>
            <span>{time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
