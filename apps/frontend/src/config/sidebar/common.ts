import { Bell, User, HelpCircle } from "lucide-react";
import { ROUTE_PATHS } from "../module-registry";

export const commonMenu = [
  {
    title: "Notifications",
    path: ROUTE_PATHS.COMMON.NOTIFICATIONS,
    icon: Bell,
  },
  { title: "My Profile", path: ROUTE_PATHS.COMMON.PROFILE, icon: User },
  {
    title: "Help & Support",
    path: ROUTE_PATHS.COMMON.HELP,
    icon: HelpCircle,
  },
];
