"use client";
import { useUser } from "@clerk/nextjs";
import {
  Fullscreen,
  HelpCircle,
  KeyRound,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Moderators",
      href: `/u/${user?.username}/moderators`,
      icon: Sparkles,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
    {
      label: "How to start a stream",
      href: `/u/${user?.username}/how-to`,
      icon: HelpCircle,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }
  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
