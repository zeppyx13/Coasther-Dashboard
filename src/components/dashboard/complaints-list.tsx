"use client";

import SectionCard from "./section-card";
import type { ComplaintItem } from "@/types/dashboard";

type ComplaintsListProps = {
    items: ComplaintItem[];
};

const statusMap: Record<ComplaintItem["status"], string> = {
    open: "bg-[#FFF4E5] text-[#B76E00]",
    in_progress: "bg-[#EAF2FF] text-[#2F5BBA]",
    closed: "bg-[#EAFBF0] text-[#1F8A4C]",
};

const statusLabelMap: Record<ComplaintItem["status"], string> = {
    open: "Open",
    in_progress: "Diproses",
    closed: "Selesai",
};

function formatComplaintDate(date: string) {
    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}

export default function ComplaintsList({ items }: ComplaintsListProps) {
    return (
        <SectionCard>
            <p className="font-inter text-sm text-[#666]">Keluhan Penghuni</p>
            <h3 className="mt-1 font-poppins text-xl font-semibold text-[#2F2F2F]">
                Complaint Management
            </h3>

            <div className="mt-6 space-y-4">
                {items.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#D8D8D8] bg-[#FAFAFA] p-6 text-center">
                        <p className="font-inter text-sm text-[#777]">
                            Belum ada complaint terbaru.
                        </p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-2xl border border-[#EAEAEA] bg-[#F8F8F8] p-4"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="font-inter text-sm font-semibold text-[#2F2F2F]">
                                        {item.title}
                                    </p>
                                    <p className="mt-1 font-inter text-xs text-[#777]">
                                        Kamar {item.room_number} • Lantai {item.room_floor}
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-[11px] font-medium ${statusMap[item.status]}`}
                                >
                                    {statusLabelMap[item.status]}
                                </span>
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-3">
                                <p className="font-inter text-xs text-[#888]">
                                    {formatComplaintDate(item.created_at)}
                                </p>

                                <div className="flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        className="rounded-xl border border-[#D6D6D6] px-3 py-2 font-inter text-xs font-medium text-[#2F2F2F] transition hover:bg-[#F1F1F1]"
                                    >
                                        Detail
                                    </button>

                                    <button
                                        type="button"
                                        className="rounded-xl border border-[#C6A971] px-3 py-2 font-inter text-xs font-medium text-[#7B1113] transition hover:bg-[#F8F1E7]"
                                    >
                                        Proses
                                    </button>

                                    <button
                                        type="button"
                                        className="rounded-xl bg-[#7B1113] px-3 py-2 font-inter text-xs font-medium text-white transition hover:opacity-90"
                                    >
                                        Selesai
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </SectionCard>
    );
}