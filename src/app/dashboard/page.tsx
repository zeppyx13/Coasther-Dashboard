import DashboardShell from "@/components/dashboard/dashboard-shell";
import ChartPlaceholder from "@/components/dashboard/chart-placeholder";
import ActivityList from "@/components/dashboard/activity-list";
import RoomsTable from "@/components/dashboard/rooms-table";
import SummaryCard from "@/components/dashboard/summary-card";
import DashboardStatsSection from "@/components/dashboard/dashboard-stats-section";
import {
    activities,
    monthlyUsage,
    rooms,
    sidebarMenus,
    stats,
    summaryItems,
} from "@/lib/dashboard-data";

export default function AdminDashboardPage() {
    return (
        <DashboardShell menus={sidebarMenus}>
            <DashboardStatsSection />

            <section className="grid gap-6 xl:grid-cols-3">
                <ChartPlaceholder values={monthlyUsage} />
                <ActivityList items={activities} />
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
                <RoomsTable rooms={rooms} />
                <SummaryCard totalIncome="Rp5.420.000" items={summaryItems} />
            </section>
        </DashboardShell>
    );
}