"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderClosed, BriefcaseBusiness, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderClosed },
  { name: "Services", href: "/services", icon: BriefcaseBusiness },
  { name: "Contact", href: "/contact", icon: MessageSquare },
];

export function MobileBottomNav({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 w-full pb-[env(safe-area-inset-bottom)] ${className}`}>
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-around w-full px-4 py-3 bg-background border-t border-white/20"
      >
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(`${item.href}/`));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-center px-5 py-1 transition-colors ${isActive ? "text-white" : "!text-[#A0A0A0]"}`}
            >
              <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
