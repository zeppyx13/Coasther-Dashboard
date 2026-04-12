"use client";

import { Bell, Search, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

type DashboardTopbarProps = {
    onMenuClick: () => void;
};

export default function DashboardTopbar({ onMenuClick }: DashboardTopbarProps) {
    const [user, setUser] = useState<{ name?: string } | null>(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    const firstName = user?.name?.split(" ")[0] ?? "Admin";

    return (
        <header className="sticky top-0 z-10 border-b border-[#EAEAEA] bg-white/90 backdrop-blur">
            <div className="flex items-center gap-4 px-6 py-4">

                <button
                    type="button"
                    onClick={onMenuClick}
                    title="Open menu"
                    className="rounded-xl border border-[#EAEAEA] p-2 transition hover:bg-[#F8F8F8] lg:hidden"
                >
                    <Menu size={20} className="text-[#555]" />
                </button>

                <div className="flex-1">
                    <p className="font-inter text-sm text-[#666]">
                        Selamat datang kembali,{" "}
                        <span className="font-semibold text-[#2F2F2F]">{firstName}</span>
                    </p>
                    <h2 className="font-poppins text-xl font-bold text-[#2F2F2F] md:text-2xl">
                        Dashboard Overview
                    </h2>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        title="Notifications"
                        className="rounded-2xl border border-[#EAEAEA] bg-white p-3 transition hover:bg-[#F8F8F8]"
                    >
                        <Bell size={18} className="text-[#7B1113]" />
                    </button>
                </div>
            </div>
        </header>
    );
}