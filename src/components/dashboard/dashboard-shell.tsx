import type { ReactNode } from "react";
import DashboardSidebar from "./dashboard-sidebar";
import DashboardTopbar from "./dashboard-topbar";
import type { SidebarMenuItem } from "@/types/dashboard";

type DashboardShellProps = {
    menus: SidebarMenuItem[];
    children: ReactNode;
};

export default function DashboardShell({
    menus,
    children,
}: DashboardShellProps) {
    return (
        <main className="min-h-screen bg-[#F8F8F8] text-[#2F2F2F]">
            <div className="flex min-h-screen">
                <DashboardSidebar menus={menus} />

                <section className="flex-1">
                    <DashboardTopbar />
                    <div className="space-y-6 p-6">{children}</div>
                </section>
            </div>
        </main>
    );
}