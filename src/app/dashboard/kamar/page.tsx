"use client";

import { useState } from "react";
import DashboardShell from "@/components/dashboard/nav/dashboard-shell";
import RoomListSection from "@/components/kamar/room-list-section";
import RoomOverviewSection from "@/components/kamar/room-overview-section";
import { sidebarMenus } from "@/lib/dashboard-data";

const TABS = [
    { key: "overview", label: "🏠 Overview" },
    { key: "list", label: "📋 Kelola Kamar" },
];

export default function KamarPage() {
    const [tab, setTab] = useState<"overview" | "list">("overview");

    return (
        <DashboardShell menus={sidebarMenus}>
            <div className="flex overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white w-fit">
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key as "overview" | "list")}
                        suppressHydrationWarning
                        className={`px-5 py-2.5 font-inter text-sm transition-colors ${tab === t.key
                                ? "bg-[#7B1113] text-white"
                                : "text-[#666] hover:bg-[#F8F8F8]"
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === "overview" && <RoomOverviewSection />}
            {tab === "list" && <RoomListSection />}
        </DashboardShell>
    );
}