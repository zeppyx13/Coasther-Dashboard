import type { LucideIcon } from "lucide-react";

export type StatItem = {
    title: string;
    value: string;
    desc: string;
    icon: LucideIcon;
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

export type SidebarMenuItem = {
    label: string;
    icon: LucideIcon;
    active?: boolean;
};