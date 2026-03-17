import type { LucideIcon } from "lucide-react";

export type StatItem = {
    title: string;
    value: string;
    desc: string;
    icon: LucideIcon;
};
export type SidebarIconName =
    | "home"
    | "bedDouble"
    | "users"
    | "fileText"
    | "creditCard"
    | "settings";

export type SidebarMenuItem = {
    label: string;
    iconName: SidebarIconName;
    active?: boolean;
};
export type RoomItem = {
    name: string;
    tenant: string;
    status: "Terisi" | "Kosong";
    bill: string;
};

export type ActivityItem = {
    title: string;
    time: string;
};