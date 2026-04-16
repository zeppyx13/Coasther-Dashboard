import DashboardShell from "@/components/dashboard/nav/dashboard-shell";
import MeterListSection from "@/components/iot/meter-list-section";
import { sidebarMenus } from "@/lib/dashboard-data";

export default function IotPage() {
    return (
        <DashboardShell menus={sidebarMenus}>
            <MeterListSection />
        </DashboardShell>
    );
}