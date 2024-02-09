import Icon, {
  AvailableIcons,
} from "deco-sites/deco-day/components/ui/Icon.tsx";
import Links from "deco-sites/deco-day/components/ui/LinkTree.tsx";

/**
 * @title {{{label}}}
 */
interface Link {
  label: string;
  url: string;
}

/**
 * @title {{{icon}}}
 */
interface IconLink {
  icon: AvailableIcons;
  url: string;
}

export interface Props {
  links: Link[];
  socialLinks: IconLink[];
}

export default function DecoDayFooter(props: Props) {
  return (
    <footer class="px-16 py-12 flex flex-col gap-10 items-start bg-accent">
      <img src="/deco.cx.png" />
      <div class="flex w-full justify-between">
        <ul class="flex gap-6 text-sm">
          {props.links.map((link) => (
            <li class="underline">
              <a href={link.url}>{link.label}</a>
            </li>
          ))}
        </ul>
        <ul class="flex gap-3">
          {props.socialLinks.map((link) => (
            <li>
              <a href={link.url}>
                <Icon id={link.icon} size={24} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
