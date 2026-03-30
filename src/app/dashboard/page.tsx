"use client";

import { useQuery } from "@tanstack/react-query";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import ChartPlaceholder from "@/components/dashboard/chart-placeholder";
import ComplaintsList from "@/components/dashboard/complaints-list";
import RoomsTable from "@/components/dashboard/rooms-table";
import SummaryCard from "@/components/dashboard/summary-card";
import DashboardStatsSection from "@/components/dashboard/dashboard-stats-section";
import { getComplaints } from "@/lib/dashboard-api";
import {
    monthlyUsage,
    rooms,
    sidebarMenus,
    summaryItems,
} from "@/lib/dashboard-data";

export default function AdminDashboardPage() {
    const { data: complaintsData, isLoading: isComplaintsLoading } = useQuery({
        queryKey: ["dashboard-complaints"],
        queryFn: () => getComplaints(1, 10),
    });
    console.log("DATA:", complaintsData);
    const complaints = complaintsData?.data.complaints ?? [];

    return (
        <DashboardShell menus={sidebarMenus}>
            <DashboardStatsSection />

            <section className="grid gap-6 xl:grid-cols-3">
                <ChartPlaceholder values={monthlyUsage} />
                {isComplaintsLoading ? (
                    <div className="rounded-[24px] border border-[#EAEAEA] bg-white p-6">
                        <p className="font-inter text-sm text-[#777]">Memuat complaints...</p>
                    </div>
                ) : (
                    <ComplaintsList items={complaints} />
                )}
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
                <RoomsTable rooms={rooms} />
                <SummaryCard totalIncome="Rp5.420.000" items={summaryItems} />
            </section>
        </DashboardShell>
    );
}