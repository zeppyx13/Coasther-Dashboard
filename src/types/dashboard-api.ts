export type DashboardStatsResponse = {
    success: boolean;
    message: string;
    data: {
        totalRooms: number;
        availableRooms: number;
        totalTenants: number;
        activeTenants: number;
        waterUsage: number;
        waterGrowth: number;
        electricityUsage: number;
        electricityStatus: string;
    };
};