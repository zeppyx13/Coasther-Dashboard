import type {
    ActivityItem,
    RoomItem,
    SidebarMenuItem,
    StatItem,
} from "@/types/dashboard";
import {
    BedDouble,
    Users,
    Droplets,
    Zap,
} from "lucide-react";

export const sidebarMenus: SidebarMenuItem[] = [
    { label: "Dashboard", iconName: "home", active: true },
    { label: "Kamar", iconName: "bedDouble" },
    { label: "Penghuni", iconName: "users" },
    { label: "Tagihan", iconName: "fileText" },
    { label: "Pembayaran", iconName: "creditCard" },
    { label: "Pengaturan", iconName: "settings" },
];

export const rooms: RoomItem[] = [
    { name: "Kamar A1", tenant: "Bagus Mahardika", status: "Terisi", bill: "Rp450.000" },
    { name: "Kamar A2", tenant: "-", status: "Kosong", bill: "-" },
    { name: "Kamar B1", tenant: "Rama Wijaya", status: "Terisi", bill: "Rp520.000" },
    { name: "Kamar B2", tenant: "Nanda Putri", status: "Terisi", bill: "Rp490.000" },
];

export const monthlyUsage = [45, 62, 58, 80, 66, 72, 90, 76];

export const summaryItems = [
    { label: "Kamar terisi", value: "10/12" },
    { label: "Tagihan lunas", value: "8" },
    { label: "Belum bayar", value: "2" },
    { label: "Pemakaian tertinggi", value: "Kamar B1" },
];