import Icon, {
  AvailableIcons,
} from "deco-sites/deco-day/components/ui/Icon.tsx";

interface Props {
  sponsors?: AvailableIcons[];
}
export default function Sponsors({
  sponsors,
}: Props) {
  return (
    <>
      <div class="flex flex-col items-center justify-center gap-3.5 lg:gap-6 leading-[150%] w-full max-w-[345px] lg:max-w-[461px] mx-auto">
        <h4 class="text-white dark:text-black uppercase text-[0.65rem] lg:text-[0.85rem]">
          Sponsors
        </h4>
        <div class="flex gap-6 text-white dark:text-black h-[27px] lg:h-[36px] justify-center w-full">
          {sponsors?.map((icon) => (
            <>
              <Icon id={icon} class="fill-white dark:fill-black" />
            </>
          ))}
        </div>
      </div>
    </>
  );
}
