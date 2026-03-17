import SectionCard from "./section-card";
import type { RoomItem } from "@/types/dashboard";

type RoomsTableProps = {
    rooms: RoomItem[];
};

export default function RoomsTable({ rooms }: RoomsTableProps) {
    return (
        <SectionCard className="xl:col-span-2">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-inter text-sm text-[#666]">Monitoring Kamar</p>
                    <h3 className="mt-1 font-poppins text-xl font-semibold text-[#2F2F2F]">
                        Status Kamar & Tagihan
                    </h3>
                </div>

                <button className="rounded-2xl bg-[#7B1113] px-4 py-2 font-poppins text-sm font-semibold text-[#C6A971] transition hover:opacity-90">
                    Lihat Semua
                </button>
            </div>

            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-3">
                    <thead>
                        <tr>
                            <th className="text-left font-inter text-xs font-medium uppercase tracking-wide text-[#777]">
                                Kamar
                            </th>
                            <th className="text-left font-inter text-xs font-medium uppercase tracking-wide text-[#777]">
                                Penghuni
                            </th>
                            <th className="text-left font-inter text-xs font-medium uppercase tracking-wide text-[#777]">
                                Status
                            </th>
                            <th className="text-left font-inter text-xs font-medium uppercase tracking-wide text-[#777]">
                                Tagihan
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room.name} className="rounded-2xl bg-[#FAFAFA]">
                                <td className="rounded-l-2xl px-4 py-4 font-inter text-sm font-medium text-[#2F2F2F]">
                                    {room.name}
                                </td>
                                <td className="px-4 py-4 font-inter text-sm text-[#666]">
                                    {room.tenant}
                                </td>
                                <td className="px-4 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 font-inter text-xs font-medium ${room.status === "Terisi"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-200 text-gray-700"
                                            }`}
                                    >
                                        {room.status}
                                    </span>
                                </td>
                                <td className="rounded-r-2xl px-4 py-4 font-inter text-sm text-[#2F2F2F]">
                                    {room.bill}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SectionCard>
    );
}