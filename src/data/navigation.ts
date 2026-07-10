import { Home, FolderClosed, BriefcaseBusiness, MessageSquare, LucideIcon } from "lucide-react";

//  SITE_ROUTES — single source of truth for the main navigable sections.
//  Used by: Menu, MenuContent, TransitionProvider (getPageName).
export const SITE_ROUTES: {
  label: string;
  brandLabel: string;
  href: string
}[] = [
  { label: "Projects", brandLabel: "PROJECTS", href: "/projects" },
  // { label: "Experience", brandLabel: "EXPERIENCE", href: "/experience" }, // Disabled — page not ready
  { label: "About Me", brandLabel: "ABOUT", href: "/about" },
  { label: "Contact", brandLabel: "CONTACT", href: "/contact" },
];

// FOOTER_PAGE_LINKS — footer navigation list.
export const FOOTER_PAGE_LINKS: {
  label: string;
  href: string
}[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  // { label: "Experience", href: "/experience" }, // Disabled — page not ready
  { label: "About Me", href: "/about" },
  { label: "Contact Now", href: "#" },
];

// MOBILE_NAV_ITEMS — mobile bottom navigation bar items.
export const MOBILE_NAV_ITEMS: {
  name: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderClosed },
  // { name: "Experience", href: "/experience", icon: Building2 },
  { name: "Services", href: "/services", icon: BriefcaseBusiness },
  { name: "Contact", href: "/contact", icon: MessageSquare },
];
