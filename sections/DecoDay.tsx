import { Section } from "deco/blocks/section.ts";

export interface Props {
  campaignTimer: Section;
  animationsPanel: {
    title: string;
    text: string;
  };
  infoPanel: {
    title: string;
    date: string;
    location: string;
    ctaText: string;
  }
}

export default function DecoDay({
    animationsPanel,
    campaignTimer: {
        Component: CampaignTimer,
        props: campaignTimerProps,
    },
    infoPanel,
}: Props) {
  return <div class="flex h-screen w-screen">
    <div class="relative h-screen w-[50vw] overflow-clip">
        <div id="canvas" class="absolute z-[-5]"></div>
        <div class="absolute z-[-2] flex flex-col items-center pt-12 gap-4 bg-black dark:bg-white h-screen w-[50vw]">
            <div class="absolute inset-0 flex justify-end" style="right: -300px; top: -150px">
                <div class="opacity-50 bg-[#02F67C] w-96 h-96 rounded-full blur-[150px]"></div>
                <div class="opacity-50 bg-[#9900E5] w-96 h-96 rounded-full blur-[150px]"></div>
            </div>
            <h1 class="text-green-500 text-center text-4xl">{animationsPanel.title}</h1>
            <p class="text-white dark:text-black text-center w-3/4 text-2xl">{animationsPanel.text}</p>
        </div>
        <div class="z-10">
            <div class="elem btn btn-primary absolute btn-lg">Click me!</div>
            <div class="elem btn btn-primary absolute btn-lg">Click me!</div>

            <div class="elem btn btn-secondary absolute btn-lg">Click me!</div>
            <div class="elem btn bg-secondary absolute btn-lg">Click me!</div>

            <div class="elem btn bg-accent absolute btn-lg">AB Testing</div>
            <div class="elem btn bg-info absolute btn-lg">Click me!</div>
            <div class="elem btn bg-warning absolute btn-lg">Click me!</div>
            <div class="elem btn bg-neutral absolute btn-lg">Click me!</div>
            <div class="elem btn bg-accent absolute btn-lg">AI</div>
            
            <input type="range" class="elem absolute border range w-32" min="0" max="100" value="40" />

            <input type="text" class="elem absolute input input-lg" placeholder="Type here"/>
            <input type="text" class="elem absolute input input-lg" placeholder="Type here"/>

            <input type="checkbox" class="toggle toggle-lg elem absolute" checked />
            <input type="checkbox" class="toggle toggle-lg elem absolute" checked />
            <input type="checkbox" class="toggle toggle-lg elem absolute" checked />

            <input type="checkbox" checked class="checkbox border scale-150 checkbox-lg elem absolute" />
            <input type="checkbox" checked class="checkbox border scale-150 checkbox-lg elem absolute" />
            <input type="checkbox" checked class="checkbox border scale-150 checkbox-lg elem absolute" />

            <input type="radio" name="radio-2" class="radio radio-primary elem absolute rounded-full" checked />
            <input type="radio" name="radio-3" class="radio radio-primary elem absolute rounded-full" checked />
            <input type="radio" name="radio-1" class="radio radio-primary elem absolute rounded-full" checked />
            <input type="radio" name="radio-4" class="radio radio-primary elem absolute rounded-full" checked />
            <input type="radio" name="radio-5" class="radio radio-primary elem absolute rounded-full" checked />
            <input type="radio" name="radio-6" class="radio radio-primary elem absolute rounded-full" checked />
            <input type="radio" name="radio-7" class="radio radio-primary elem absolute rounded-full" checked />
            <input type="radio" name="radio-8" class="radio radio-primary elem absolute rounded-full" checked />

            <label class="swap swap-rotate absolute elem bg-white p-2 rounded-full">
                <input type="checkbox" id="toggle"/>
                <svg class="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                <svg class="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            </label>
        </div>
    </div>
    <div class="h-screen w-[50vw] bg-white dark:bg-black py-11 px-12 dark:text-white">
        <div class="flex flex-col gap-10 items-start border-b border-black dark:border-white pb-16 mb-16">
            <img src="/deco.cx.png" />
            <h2 class="text-7xl">{infoPanel.title}</h2>
            <div class="flex flex-col gap-1 items-start">
                <p class="text-2xl">{infoPanel.date}</p>
                <p>{infoPanel.location}</p>
            </div>
        </div>
        <div class="flex flex-col gap-4 items-center">
            <div class="w-1/2">
                <CampaignTimer {...campaignTimerProps}/>
            </div>
            <button class="text-2xl grid place-items-center w-full h-16 border border-black dark:border-white rounded-[100px]">
                <span>{infoPanel.ctaText}</span>
            </button>
            <span>Don't have an invite? Join our <a href="/" class="text-accent-content">waiting list</a>.</span>
        </div>
    </div>
    <script type="module" src="/matter-script.js" defer />
  </div>;
}
