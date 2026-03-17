import SidebarItem from "./sidebar-item";
import type { SidebarMenuItem } from "@/types/dashboard";

type DashboardSidebarProps = {
    menus: SidebarMenuItem[];
};

export default function DashboardSidebar({
    menus,
}: DashboardSidebarProps) {
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
                    {menus.map((menu) => (
                        <SidebarItem
                            key={menu.label}
                            icon={menu.icon}
                            label={menu.label}
                            active={menu.active}
                        />
                    ))}
                </div>
            </nav>

            <div className="border-t border-[#EAEAEA] p-4">
                <div className="rounded-2xl bg-[#F8F8F8] p-4">
                    <p className="font-inter text-xs text-[#666]">Login sebagai</p>
                    <p className="mt-1 font-poppins text-sm font-semibold text-[#2F2F2F]">
                        Admin Coasther
                    </p>
                    <p className="mt-1 font-inter text-xs text-[#7B1113]">
                        admin@coasther.com
                    </p>
                </div>
            </div>
        </aside>
    );
}