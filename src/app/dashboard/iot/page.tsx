"use client";

import { useState } from "react";
import DashboardShell from "@/components/dashboard/nav/dashboard-shell";
import MeterListSection from "@/components/iot/meter-list-section";
import IotMonitorSection from "@/components/iot/iot-monitor-section";
import { sidebarMenus } from "@/lib/dashboard-data";

const TABS = [
    { key: "monitor", label: "🟢 Live Monitor" },
    { key: "devices", label: "⚙️ Kelola Alat" },
];

export default function IotPage() {
    const [tab, setTab] = useState<"monitor" | "devices">("monitor");

    return (
        <DashboardShell menus={sidebarMenus}>
            {/* Tab switcher */}
            <div className="flex overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white w-fit">
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key as "monitor" | "devices")}
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

            {tab === "monitor" && <IotMonitorSection />}
            {tab === "devices" && <MeterListSection />}
        </DashboardShell>
    );
}