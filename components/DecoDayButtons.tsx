import Icon, {
  AvailableIcons,
} from "deco-sites/deco-day/components/ui/Icon.tsx";

interface TopButton {
  label: string;
  icon: AvailableIcons;
}

interface Props {
  infoPanel: {
    topButtons: TopButton[];
  };
}
export default function DecoDayButtons({
  infoPanel,
}: Props) {
  return (
    <>
      <div class="flex flex-row items-center justify-center gap-5 lg:gap-8 leading-[150%] mb-2.5 lg:mb-7">
        {infoPanel.topButtons.map(({ icon, label }, index) => (
          <>
            <div
              class={`open-button w-auto flex items-center justify-center gap-[11px] lg:gap-4 text-[0.8rem] lg:text-[20px] lg:py-1
                          border-[#FFFFFF26] text-white dark:border-black dark:text-black
                            `}
            >
              <Icon id={icon} size={20} class="w-[13px] lg:w-auto" />
              <span>{label}</span>
            </div>
            {index !== infoPanel.topButtons.length - 1 && (
              <div class="h-full text-white border dark:text-black w-[0.5px]">
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
}
