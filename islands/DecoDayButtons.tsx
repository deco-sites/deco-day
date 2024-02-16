import { useUI } from "deco-sites/deco-day/sdk/useUI.ts";
import Icon, {
  AvailableIcons,
} from "deco-sites/deco-day/components/ui/Icon.tsx";

interface TopButton {
  label: string;
  icon: AvailableIcons;
  url: string;
}

interface Props {
  infoPanel: {
    topButtons: TopButton[];
    }
}
export default function DecoDayButtons({
  infoPanel
}: Props) {
  const { agendaVisible } = useUI();

  const toggleMenu = () => {
    agendaVisible.value = !agendaVisible.value;
  };

  return (
    <>
        <div class="flex flex-row items-center justify-center w-full gap-1.5 lg:gap-4 leading-[150%]">
                {infoPanel.topButtons.map(({ icon, label, url }) => (
                  <button
                    class={`open-button w-1/2 flex items-center justify-center gap-[11px] lg:gap-4 text-[12px] lg:text-[20px] py-4 border rounded-[100px]
                          border-[#FFFFFF26] text-white dark:border-black dark:text-black bg-white bg-opacity-5 hover:opacity-50
                            `}
                    onClick={toggleMenu}
                  >
                    <Icon id={icon} size={20} />
                    <span>{label}</span>
                  </button>
                  ))}
              </div>
    </>
    
  );
}