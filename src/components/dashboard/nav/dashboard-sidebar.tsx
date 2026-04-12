"use client";

import {
    LogOut,
    Home,
    BedDouble,
    Users,
    FileText,
    CreditCard,
    Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import SidebarItem from "./sidebar-item";
import type { SidebarIconName, SidebarMenuItem } from "@/types/dashboard";
import { useState, useEffect } from "react";
import { clearAuth, getUser } from "@/lib/auth";


type DashboardSidebarProps = {
    menus: SidebarMenuItem[];
};

const iconMap: Record<SidebarIconName, LucideIcon> = {
    home: Home,
    bedDouble: BedDouble,
    users: Users,
    fileText: FileText,
    creditCard: CreditCard,
    settings: Settings,
};

export default function DashboardSidebar({
    menus,
}: DashboardSidebarProps) {
    const router = useRouter();

    async function handleLogout() {
        const result = await Swal.fire({
            title: "Logout?",
            text: "Anda akan keluar dari dashboard.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, logout",
            cancelButtonText: "Batal",
            confirmButtonColor: "#b91c1c",
            cancelButtonColor: "#7B1113",
        });

        if (!result.isConfirmed) return;

        clearAuth();
        router.push("/");
        router.refresh();
    }
    const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

    useEffect(() => {
        setUser(getUser());
    }, []);
    return (
        <aside className="hidden w-72 flex-col border-r border-[#EAEAEA] bg-white lg:flex">
            <div className="border-b border-[#EAEAEA] px-6 py-5">
                <p className="font-inter text-xs font-medium uppercase tracking-[0.2em] text-[#7B1113]">
                    Coasther
                </p>
                <h1 className="mt-2 font-poppins text-2xl font-bold text-[#2F2F2F]">
                    Admin Panel
                </h1>
            </div>

            <nav className="flex-1 px-4 py-6">
                <div className="space-y-2">
                    {menus.map((menu) => {
                        const Icon = iconMap[menu.iconName];

                        return (
                            <SidebarItem
                                key={menu.label}
                                icon={Icon}
                                label={menu.label}
                                active={menu.active}
                            />
                        );
                    })}
                </div>
            </nav>

            <div className="border-t border-[#EAEAEA] p-4">
                <div className="rounded-2xl bg-[#F8F8F8] p-4">
                    <p className="font-inter text-xs text-[#666]">Login sebagai</p>
                    <p className="mt-1 font-poppins text-sm font-semibold text-[#2F2F2F]">
                        {user?.name}
                    </p>
                    <p className="mt-1 font-inter text-xs text-[#7B1113]">
                        {user?.email}
                    </p>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 font-inter text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
}