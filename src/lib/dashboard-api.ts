import { api } from "@/lib/api";
import type { ComplaintsResponse } from "@/types/dashboard";
import type { DashboardStatsResponse } from "@/types/dashboard-api";
import { getToken } from "./auth";

export async function getDashboardStats() {
    const response = await api.get<DashboardStatsResponse>("/api/dashboard/stats");
    return response.data.data;
}
export async function getComplaints(page = 1, limit = 10) {
    const token = getToken();

    const response = await api.get<ComplaintsResponse>("/api/complaints/admin/complaints", {
        params: { page, limit },
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    return response.data;
}