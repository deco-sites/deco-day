/**
 * @title {{{label}}}
 */
interface ScheduledEvent {
  label: string;
  time: string;
}

export interface Props {
  events: ScheduledEvent[];
}

export default function Schedule(props: Props) {
  return (
    <ul class="flex flex-col w-full">
      {props.events.map(({ label, time }) => (
        <li class="flex py-3 justify-between items-start self-stretch border-b border-black border-solid border-opacity-50 dark:border-white">
          <span class="text-base-700 text-base font-normal leading-tight tracking-tight">
            {label}
          </span>
          <span class="text-base-700 text-base font-normal leading-tight tracking-tight">
            {time}
          </span>
        </li>
      ))}
    </ul>
  );
}
