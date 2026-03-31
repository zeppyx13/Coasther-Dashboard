import type { LucideIcon } from "lucide-react";

type SidebarItemProps = {
    icon: LucideIcon;
    label: string;
    active?: boolean;
};

export default function SidebarItem({
    icon: Icon,
    label,
    active = false,
}: SidebarItemProps) {
    return (
        <button
            type="button"
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${active
                    ? "bg-[#7B1113] text-[#C6A971]"
                    : "text-[#555] hover:bg-[#F8F8F8]"
                }`}
        >
            <Icon size={18} />
            <span className="font-inter text-sm font-medium">{label}</span>
        </button>
    );
}