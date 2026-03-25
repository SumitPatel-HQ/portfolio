import {
  LucideIcon,
  Mail,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, XIcon } from "@/components/ui/SocialIcons";

export type SocialLink = {
  id: number;
  label: string;
  href: string;
  username?: string;
  ariaLabel?: string;
  icon: LucideIcon;
};

export const socials: SocialLink[] = [
  {
    id: 1,
    label: "Email",
    href: "mailto:sumitvp2@gmail.com",
    username: "sumitvp2@gmail.com",
    ariaLabel: "Send an email to sumitvp2@gmail.com",
    icon: Mail,
  },
  {
    id: 2,
    label: "GitHub",
    href: "https://github.com/SumitPatel-HQ",
    username: "@SumitPatel-HQ",
    ariaLabel: "Visit my GitHub profile",
    icon: GithubIcon as LucideIcon,
  },
  {
    id: 3,
    label: "LinkedIn",
    href: "https://linkedin.com/in/sumitvpatel",
    username: "sumitvpatel",
    ariaLabel: "Connect with me on LinkedIn",
    icon: LinkedinIcon as LucideIcon,
  },
  {
    id: 4,
    label: "Instagram",
    href: "https://instagram.com/sumitvpatel_",
    username: "@sumitvpatel_",
    ariaLabel: "Follow me on Instagram",
    icon: InstagramIcon as LucideIcon,
  },
  {
    id: 5,
    label: "Twitter",
    href: "https://x.com/ZSumit_",
    username: "@ZSumit_",
    ariaLabel: "Follow me on X (Twitter)",
    icon: XIcon as LucideIcon,
  },
];
