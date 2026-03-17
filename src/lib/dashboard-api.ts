import { api } from "@/lib/api";
import type { DashboardStatsResponse } from "@/types/dashboard-api";

export async function getDashboardStats() {
    const response = await api.get<DashboardStatsResponse>("/api/dashboard/stats");
    return response.data.data;
}