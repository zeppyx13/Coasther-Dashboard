"use client";

import { useQuery } from "@tanstack/react-query";
import ComplaintsList from "./complaints-list";
import { getComplaints } from "@/lib/dashboard-api";

export default function ComplaintsSection() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["dashboard-complaints"],
        queryFn: () => getComplaints(1, 10),
    });

    const complaints = data?.data?.complaints ?? [];

    if (isLoading) {
        return (
            <div className="rounded-3xl border border-[#EAEAEA] bg-white p-6">
                <p className="font-inter text-sm text-[#777]">
                    Memuat complaints...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-3xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
                Gagal memuat complaints.
            </div>
        );
    }

    return <ComplaintsList items={complaints} />;
}