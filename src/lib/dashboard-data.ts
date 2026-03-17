import {
    Home,
    BedDouble,
    Users,
    FileText,
    CreditCard,
    Settings,
    Droplets,
    Zap,
} from "lucide-react";
import type {
    ActivityItem,
    RoomItem,
    SidebarMenuItem,
    StatItem,
} from "@/types/dashboard";

export const sidebarMenus: SidebarMenuItem[] = [
    { label: "Dashboard", icon: Home, active: true },
    { label: "Kamar", icon: BedDouble },
    { label: "Penghuni", icon: Users },
    { label: "Tagihan", icon: FileText },
    { label: "Pembayaran", icon: CreditCard },
    { label: "Pengaturan", icon: Settings },
];

export const stats: StatItem[] = [
    {
        title: "Total Kamar",
        value: "12",
        desc: "2 kamar tersedia",
        icon: BedDouble,
    },
    {
        title: "Total Penghuni",
        value: "18",
        desc: "Aktif bulan ini",
        icon: Users,
    },
    {
        title: "Pemakaian Air",
        value: "24.8 m³",
        desc: "Naik 8% dari bulan lalu",
        icon: Droplets,
    },
    {
        title: "Pemakaian Listrik",
        value: "318 kWh",
        desc: "Stabil minggu ini",
        icon: Zap,
    },
];

export const rooms: RoomItem[] = [
    { name: "Kamar A1", tenant: "Bagus Mahardika", status: "Terisi", bill: "Rp450.000" },
    { name: "Kamar A2", tenant: "-", status: "Kosong", bill: "-" },
    { name: "Kamar B1", tenant: "Rama Wijaya", status: "Terisi", bill: "Rp520.000" },
    { name: "Kamar B2", tenant: "Nanda Putri", status: "Terisi", bill: "Rp490.000" },
];

export const activities: ActivityItem[] = [
    { title: "Pembayaran kamar B1 berhasil", time: "10 menit lalu" },
    { title: "Data meter air kamar A1 diperbarui", time: "25 menit lalu" },
    { title: "Tenant baru ditambahkan", time: "1 jam lalu" },
    { title: "Tagihan bulanan berhasil dibuat", time: "3 jam lalu" },
];

export const monthlyUsage = [45, 62, 58, 80, 66, 72, 90, 76];

export const summaryItems = [
    { label: "Kamar terisi", value: "10/12" },
    { label: "Tagihan lunas", value: "8" },
    { label: "Belum bayar", value: "2" },
    { label: "Pemakaian tertinggi", value: "Kamar B1" },
];