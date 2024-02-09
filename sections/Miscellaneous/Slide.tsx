import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface SlideProps {
  label?: string;
  repeat?: number;
  icon?: AvailableIcons;
}

export interface Props {
  content?: SlideProps[];
}

export default function Slide({
  content = [
    {
      label: "Label",
      repeat: 30,
      icon: "ChevronRight",
    },
  ],
}: Props) {
  const slideContent = content?.map(({ label, icon, repeat = 1 }) => {
    return (
      <div class="flex items-center gap-x-10 mx-4 border-b border-t border-black dark:border-white dark:bg-black dark:text-white">
        {Array(repeat).fill(0).map(() => (
          <>
            <span class="text-sm font-extralight text-base-content dark:text-white whitespace-nowrap">
              {label}
            </span>
            {icon && (
              <Icon
                id={icon}
                name={icon}
                width={24}
                height={24}
              />
            )}
          </>
        ))}
      </div>
    );
  });
  return (
    <div class="bg-secondary relative w-full overflow-hidden h-11">
      <div class="animate-sliding absolute top-0 left-0 flex flex-nowrap h-11">
        {slideContent}
      </div>
    </div>
  );
}
