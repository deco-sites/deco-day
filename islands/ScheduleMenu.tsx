import UiButton from "deco-sites/deco-day/components/ui/Button.tsx";
import { useUI } from "deco-sites/deco-day/sdk/useUI.ts";
import Schedule, {
  Props as ScheduleProps,
} from "deco-sites/deco-day/sections/Schedule.tsx";
import SlideBanner, {
  Props as SlideBannerProps,
} from "deco-sites/deco-day/sections/Miscellaneous/Slide.tsx";
import SocialLinks, {
  Props as SocialLinksProps,
} from "deco-sites/deco-day/sections/SocialLinks.tsx";
import Icon, {
  AvailableIcons,
} from "deco-sites/deco-day/components/ui/Icon.tsx";

interface TopButton {
  label: string;
  icon: AvailableIcons;
  url: string;
}

interface Header {
  date?: string;
  loc?: string;
  fullLoc?: string;
}

interface Props {
  infoPanel: {
    scheduleHeader?: Header;
    schedule: ScheduleProps;
    slideBanner: SlideBannerProps;
    socialLinks: SocialLinksProps;
    topButtons: TopButton[];
    ctaText: string;
  };
  isMobile: string;
}
export default function ScheduleMenu({
  infoPanel,
  isMobile,
}: Props) {
  const { agendaVisible } = useUI();

  const toggleAgenda = () => {
    agendaVisible.value = !agendaVisible.value;
  };

  return (
    <>
      <div class="absolute w-full bg-transparent flex z-[5] px-4 lg:px-6 pt-5 lg:pt-6 pb-6 justify-between items-start h-[42px]">
        {isMobile === "desktop"
          ? <Icon id="DecoLogo" />
          : <Icon id="DecoLogoMobile" />}
        <UiButton
          onClick={toggleAgenda}
          class={`border-0 h-[40px!important] font-normal top-4 right-4 text-[16px] leading-[150%] bg-white dark:bg-black text-[#0D1717] dark:text-white px-4 py-2 rounded-[100px] ${
            agendaVisible.value 
            ? "invisible"
            : "visible"
        }`}
        >
          Agenda
        </UiButton>
      </div>
      <div
        id="agendaContainer"
        class={`absolute z-[999!important] ${
          agendaVisible.value
            ? "shadow-lg shadow-left transition-transform duration-700 ease-in-out transform translate-x-0 lg:translate-x-0"
            : "transition-transform duration-700 ease-in-out transform translate-x-full"
        } h-full top-0 right-0 px-8 py-10 w-full lg:w-1/3 max-w-[350px] bg-white border border-gray-300 rounded p-4 shadow`}
      >
        <span
          onClick={toggleAgenda}
          class="absolute top-2 right-3 text-[20px] font-medium cursor-pointer text-gray-500"
        >
          X
        </span>
        <div class="flex flex-col gap-y-8">
          <div class="flex flex-col items-start gap-y-8">
            <span class="text-black text-[24px] leading-tight tracking-tight">
              {infoPanel.scheduleHeader?.date}
            </span>
            <div class="flex flex-col gap-2 max-w-[231px]">
              <span class="text-black text-[24px] leading-tight tracking-tight">
                {infoPanel.scheduleHeader?.loc}
              </span>
              <span class="text-black font-albert-sans text-base leading-tight tracking-tight">
                {infoPanel.scheduleHeader?.fullLoc}
              </span>
            </div>
          </div>
          <div class="flex flex-col">
            <h3 class="text-albert-sans text-base leading-tight tracking-tight py-6 border-b border-black border-solid border-opacity-50">
              Agenda
            </h3>
            <div class="flex flex-col gap-10 items-start pb-16 mb-16">
              <Schedule {...infoPanel.schedule} />
            </div>
          </div>
        </div>
        <div class="pt-9 hidden md:flex justify-end lg:absolute lg:bottom-4 lg:right-4">
          <SocialLinks {...infoPanel.socialLinks} />
        </div>
      </div>
    </>
  );
}
