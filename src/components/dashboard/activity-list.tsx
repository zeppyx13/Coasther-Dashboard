import SectionCard from "./section-card";
import type { ActivityItem } from "@/types/dashboard";

type ActivityListProps = {
    items: ActivityItem[];
};

export default function ActivityList({ items }: ActivityListProps) {
    return (
        <SectionCard>
            <p className="font-inter text-sm text-[#666]">Aktivitas Terbaru</p>
            <h3 className="mt-1 font-poppins text-xl font-semibold text-[#2F2F2F]">
                Log Sistem
            </h3>

            <div className="mt-6 space-y-4">
                {items.map((item) => (
                    <div key={`${item.title}-${item.time}`} className="rounded-2xl bg-[#F8F8F8] p-4">
                        <p className="font-inter text-sm font-medium text-[#2F2F2F]">
                            {item.title}
                        </p>
                        <p className="mt-1 font-inter text-xs text-[#777]">{item.time}</p>
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}