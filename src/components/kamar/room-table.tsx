"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { Room } from "@/types/room";

type RoomTableProps = {
    rooms: Room[];
    onEdit: (room: Room) => void;
    onDelete: (room: Room) => void;
};

function formatRupiah(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
}

export default function RoomTable({ rooms, onEdit, onDelete }: RoomTableProps) {
    if (rooms.length === 0) {
        return (
            <div className="rounded-3xl border border-[#EAEAEA] bg-white px-6 py-16 text-center">
                <p className="font-inter text-sm text-[#999]">Tidak ada kamar ditemukan.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-3xl border border-[#EAEAEA] bg-white">
            <table className="min-w-full border-separate border-spacing-y-0">
                <thead>
                    <tr className="border-b border-[#EAEAEA]">
                        <th className="px-6 py-4 text-left font-inter text-xs font-medium text-[#777]">Kamar</th>
                        <th className="px-6 py-4 text-left font-inter text-xs font-medium text-[#777]">Lantai</th>
                        <th className="px-6 py-4 text-left font-inter text-xs font-medium text-[#777]">Harga / Bulan</th>
                        <th className="px-6 py-4 text-left font-inter text-xs font-medium text-[#777]">Deposit</th>
                        <th className="px-6 py-4 text-left font-inter text-xs font-medium text-[#777]">Status</th>
                        <th className="px-6 py-4 text-left font-inter text-xs font-medium text-[#777]">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room, i) => {
                        const isAvailable = Boolean(room.is_available);
                        const isLast = i === rooms.length - 1;

                        return (
                            <tr
                                key={room.id}
                                className={`transition hover:bg-[#FAFAFA] ${!isLast ? "border-b border-[#F0F0F0]" : ""}`}
                            >
                                <td className="px-6 py-4 font-poppins text-sm font-semibold text-[#2F2F2F]">
                                    {room.number}
                                </td>
                                <td className="px-6 py-4 font-inter text-sm text-[#666]">
                                    {room.floor !== null ? `Lantai ${room.floor}` : "-"}
                                </td>
                                <td className="px-6 py-4 font-inter text-sm text-[#2F2F2F]">
                                    {formatRupiah(room.price_monthly)}
                                </td>
                                <td className="px-6 py-4 font-inter text-sm text-[#666]">
                                    {formatRupiah(room.deposit)}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 font-inter text-xs font-medium ${isAvailable
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {isAvailable ? "Tersedia" : "Terisi"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onEdit(room)}
                                            title="Edit"
                                            className="rounded-xl bg-[#F8F8F8] p-2 transition hover:bg-[#EAEAEA]"
                                        >
                                            <Pencil size={15} className="text-[#555]" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(room)}
                                            title="Hapus"
                                            className="rounded-xl bg-red-50 p-2 transition hover:bg-red-100"
                                        >
                                            <Trash2 size={15} className="text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}