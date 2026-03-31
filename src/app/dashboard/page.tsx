"use client";

import DashboardShell from "@/components/dashboard/nav/dashboard-shell";
import ChartPlaceholder from "@/components/dashboard/chart-placeholder";
import ComplaintsSection from "@/components/dashboard/complaint/complaints-section";
import RoomsTable from "@/components/dashboard/rooms-table";
import SummaryCard from "@/components/dashboard/summary-card";
import DashboardStatsSection from "@/components/dashboard/stat/dashboard-stats-section";
import {
    monthlyUsage,
    rooms,
    sidebarMenus,
    summaryItems,
} from "@/lib/dashboard-data";

export default function AdminDashboardPage() {
    return (
        <DashboardShell menus={sidebarMenus}>
            <DashboardStatsSection />

            <section className="grid gap-6 xl:grid-cols-3">
                <ChartPlaceholder values={monthlyUsage} />
                <ComplaintsSection />
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
                <RoomsTable rooms={rooms} />
                <SummaryCard
                    totalIncome="Rp5.420.000"
                    items={summaryItems}
                />
            </section>
        </DashboardShell>
    );
}