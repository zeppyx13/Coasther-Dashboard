import DashboardShell from "@/components/dashboard/nav/dashboard-shell";
import RoomListSection from "@/components/kamar/room-list-section";
import { sidebarMenus } from "@/lib/dashboard-data";

export default function KamarPage() {
    return (
        <DashboardShell menus={sidebarMenus}>
            <div>
                <p className="font-inter text-sm text-[#666]">Manajemen</p>
                <h2 className="mt-1 font-poppins text-2xl font-bold text-[#2F2F2F]">
                    Data Kamar
                </h2>
            </div>

            <RoomListSection />
        </DashboardShell>
    );
}