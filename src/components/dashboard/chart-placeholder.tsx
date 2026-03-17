import { TrendingUp } from "lucide-react";
import SectionCard from "./section-card";

type ChartPlaceholderProps = {
    values: number[];
};

export default function ChartPlaceholder({
    values,
}: ChartPlaceholderProps) {
    return (
        <SectionCard className="xl:col-span-2">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-inter text-sm text-[#666]">Statistik Penggunaan</p>
                    <h3 className="mt-1 font-poppins text-xl font-semibold text-[#2F2F2F]">
                        Air & Listrik Bulanan
                    </h3>
                </div>

                <div className="flex items-center gap-2 rounded-2xl bg-[#F8F8F8] px-3 py-2">
                    <TrendingUp size={16} className="text-[#7B1113]" />
                    <span className="font-inter text-sm text-[#666]">Bulan ini</span>
                </div>
            </div>

            <div className="mt-6 flex h-72 items-end gap-4 rounded-3xl bg-[#FAFAFA] p-6">
                {values.map((h, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-3">
                        <div
                            className="w-full rounded-t-2xl bg-[#7B1113]/85"
                            style={{ height: `${h * 2}px` }}
                        />
                        <span className="font-inter text-xs text-[#777]">M{i + 1}</span>
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}