"use client";

import { useEffect, useState } from "react";
import { X, LoaderCircle } from "lucide-react";
import type { Lease, LeaseFormPayload, LeaseUpdatePayload } from "@/types/lease";

type Props = {
    open: boolean;
    editData: Lease | null;
    onClose: () => void;
    onSubmit: (payload: LeaseFormPayload | LeaseUpdatePayload) => Promise<void>;
};

export default function LeaseFormModal({ open, editData, onClose, onSubmit }: Props) {
    const [form, setForm] = useState({
        user_id: "",
        room_id: "",
        start_date: "",
        end_date: "",
        monthly_rent_snapshot: "",
        status: "active",
        note: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            setForm({
                user_id: String(editData.user_id),
                room_id: String(editData.room_id),
                start_date: editData.start_date?.slice(0, 10) ?? "",
                end_date: editData.end_date?.slice(0, 10) ?? "",
                monthly_rent_snapshot: String(editData.monthly_rent_snapshot),
                status: editData.status,
                note: editData.note ?? "",
            });
        } else {
            setForm({ user_id: "", room_id: "", start_date: "", end_date: "", monthly_rent_snapshot: "", status: "active", note: "" });
        }
    }, [editData, open]);

    async function handleSubmit() {
        try {
            setLoading(true);
            if (editData) {
                await onSubmit({
                    end_date: form.end_date || null,
                    status: form.status as "active" | "ended",
                    monthly_rent_snapshot: Number(form.monthly_rent_snapshot),
                    note: form.note || null,
                });
            } else {
                await onSubmit({
                    user_id: Number(form.user_id),
                    room_id: Number(form.room_id),
                    start_date: form.start_date,
                    end_date: form.end_date || null,
                    monthly_rent_snapshot: Number(form.monthly_rent_snapshot),
                    note: form.note || null,
                });
            }
        } finally {
            setLoading(false);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <h3 className="font-poppins text-lg font-semibold text-[#2F2F2F]">
                        {editData ? "Edit Kontrak" : "Tambah Kontrak"}
                    </h3>
                    <button title="close" onClick={onClose} className="rounded-xl p-2 transition hover:bg-[#F0F0F0]">
                        <X size={18} className="text-[#666]" />
                    </button>
                </div>

                <div className="mt-5 space-y-4">
                    {/* Hanya tampil saat tambah baru */}
                    {!editData && (
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">
                                    ID Penghuni <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={form.user_id}
                                    onChange={(e) => setForm({ ...form, user_id: e.target.value })}
                                    suppressHydrationWarning
                                    placeholder="cth. 5"
                                    className="w-full rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113]"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">
                                    ID Kamar <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={form.room_id}
                                    onChange={(e) => setForm({ ...form, room_id: e.target.value })}
                                    suppressHydrationWarning
                                    placeholder="cth. 3"
                                    className="w-full rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113]"
                                />
                            </div>
                        </div>
                    )}

                    {/* Info read-only saat edit */}
                    {editData && (
                        <div className="rounded-2xl bg-[#F8F8F8] px-4 py-3">
                            <p className="font-inter text-xs text-[#777]">Penghuni · Kamar</p>
                            <p className="mt-0.5 font-poppins text-sm font-semibold text-[#2F2F2F]">
                                {editData.tenant_name} · Kamar {editData.room_number}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">
                                Tanggal Mulai <span className="text-red-500">*</span>
                            </label>
                            <input
                                title="date start"
                                type="date"
                                value={form.start_date}
                                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                                disabled={!!editData}
                                suppressHydrationWarning
                                className="w-full rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113] disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">
                                Tanggal Berakhir
                            </label>
                            <input
                                title="date end"
                                type="date"
                                value={form.end_date}
                                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                                suppressHydrationWarning
                                className="w-full rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">
                                Sewa/Bulan <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={form.monthly_rent_snapshot}
                                onChange={(e) => setForm({ ...form, monthly_rent_snapshot: e.target.value })}
                                suppressHydrationWarning
                                placeholder="1200000"
                                className="w-full rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113]"
                            />
                        </div>
                        {editData && (
                            <div>
                                <label className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">Status</label>
                                <select
                                    title="status"
                                    value={form.status}
                                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                                    suppressHydrationWarning
                                    className="w-full rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113]"
                                >
                                    <option value="active">Aktif</option>
                                    <option value="ended">Berakhir</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">Catatan</label>
                        <textarea
                            value={form.note}
                            onChange={(e) => setForm({ ...form, note: e.target.value })}
                            placeholder="Opsional..."
                            rows={2}
                            className="w-full resize-none rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113]"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-2xl border border-[#EAEAEA] px-5 py-2.5 font-inter text-sm text-[#666] transition hover:bg-[#F8F8F8]"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-2xl bg-[#7B1113] px-5 py-2.5 font-poppins text-sm font-semibold text-[#C6A971] transition hover:opacity-90 disabled:opacity-50"
                    >
                        {loading && <LoaderCircle size={15} className="animate-spin" />}
                        {editData ? "Simpan Perubahan" : "Buat Kontrak"}
                    </button>
                </div>
            </div>
        </div>
    );
}