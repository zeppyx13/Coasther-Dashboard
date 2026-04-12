import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import type { RoomListResponse, RoomDetailResponse, RoomFormPayload } from "@/types/room";

function authHeader() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getRooms(params?: {
    search?: string;
    is_available?: "0" | "1";
    page?: number;
    limit?: number;
}) {
    const response = await api.get<RoomListResponse>("/api/rooms", {
        params,
        headers: authHeader(),
    });
    return response.data.data;
}

export async function getRoomById(id: number) {
    const response = await api.get<RoomDetailResponse>(`/api/rooms/${id}`, {
        headers: authHeader(),
    });
    return response.data.data;
}

export async function createRoom(payload: RoomFormPayload) {
    const response = await api.post("/api/rooms", payload, {
        headers: authHeader(),
    });
    return response.data;
}

export async function updateRoom(id: number, payload: Partial<RoomFormPayload>) {
    const response = await api.patch(`/api/rooms/${id}`, payload, {
        headers: authHeader(),
    });
    return response.data;
}

export async function deleteRoom(id: number) {
    const response = await api.delete(`/api/rooms/${id}`, {
        headers: authHeader(),
    });
    return response.data;
}