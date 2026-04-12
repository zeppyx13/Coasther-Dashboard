"use client";

import { useEffect, useState } from "react";
import { X, LoaderCircle } from "lucide-react";
import type { Room, RoomFormPayload } from "@/types/room";

type RoomFormModalProps = {
    open: boolean;
    editData?: Room | null;
    onClose: () => void;
    onSubmit: (payload: RoomFormPayload) => Promise<void>;
};

const EMPTY_FORM: RoomFormPayload = {
    number: "",
    floor: null,
    price_monthly: 0,
    deposit: 0,
    is_available: true,
    description: "",
    main_image_url: "",
    facility_ids: [],
};

export default function RoomFormModal({
    open,
    editData,
    onClose,
    onSubmit,
}: RoomFormModalProps) {
    const [form, setForm] = useState<RoomFormPayload>(EMPTY_FORM);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            setForm({
                number: editData.number,
                floor: editData.floor,
                price_monthly: editData.price_monthly,
                deposit: editData.deposit,
                is_available: Boolean(editData.is_available),
                description: editData.description ?? "",
                main_image_url: editData.main_image_url ?? "",
                facility_ids: [],
            });
        } else {
            setForm(EMPTY_FORM);
        }
    }, [editData, open]);

    async function handleSubmit() {
        if (!form.number.trim()) return;
        try {
            setLoading(true);
            await onSubmit(form);
        } finally {
            setLoading(false);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="font-poppins text-lg font-semibold text-[#2F2F2F]">
                        {editData ? "Edit Kamar" : "Tambah Kamar"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 transition hover:bg-[#F0F0F0]"
                        title="Tutup"
                        aria-label="Tutup modal"
                    >
                        <X size={18} className="text-[#666]" />
                    </button>
                </div>

                {/* Form */}
                <div className="mt-5 space-y-4">
                    {/* Nomor Kamar */}
                    <div>
                        <label className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">
                            Nomor Kamar <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.number}
                            onChange={(e) => setForm({ ...form, number: e.target.value })}
                            placeholder="cth. A01"
                            className="w-full rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113]"
                        />
                    </div>

                    {/* Lantai + Status dalam satu row */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">
                                Lantai
                            </label>
                            <input
                                type="number"
                                value={form.floor ?? ""}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        floor: e.target.value ? Number(e.target.value) : null,
                                    })
                                }
                                placeholder="cth. 1"
                                className="w-full rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113]"
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">
                                Status
                            </label>
                            <select
                                id="status"
                                value={form.is_available ? "1" : "0"}
                                onChange={(e) =>
                                    setForm({ ...form, is_available: e.target.value === "1" })
                                }
                                className="w-full rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113]"
                            >
                                <option value="1">Tersedia</option>
                                <option value="0">Tidak Tersedia</option>
                            </select>
                        </div>
                    </div>

                    {/* Harga + Deposit */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">
                                Harga / Bulan <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={form.price_monthly || ""}
                                onChange={(e) =>
                                    setForm({ ...form, price_monthly: Number(e.target.value) })
                                }
                                placeholder="1500000"
                                className="w-full rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113]"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">
                                Deposit
                            </label>
                            <input
                                type="number"
                                value={form.deposit || ""}
                                onChange={(e) =>
                                    setForm({ ...form, deposit: Number(e.target.value) })
                                }
                                placeholder="500000"
                                className="w-full rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113]"
                            />
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">
                            Deskripsi
                        </label>
                        <textarea
                            value={form.description ?? ""}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Deskripsi kamar..."
                            rows={3}
                            className="w-full resize-none rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113]"
                        />
                    </div>

                    {/* URL Gambar */}
                    <div>
                        <label className="mb-1.5 block font-inter text-sm font-medium text-[#2F2F2F]">
                            URL Gambar
                        </label>
                        <input
                            type="text"
                            value={form.main_image_url ?? ""}
                            onChange={(e) =>
                                setForm({ ...form, main_image_url: e.target.value })
                            }
                            placeholder="https://..."
                            className="w-full rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 font-inter text-sm outline-none transition focus:border-[#7B1113]"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-2xl border border-[#EAEAEA] px-5 py-2.5 font-inter text-sm text-[#666] transition hover:bg-[#F8F8F8]"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !form.number.trim() || !form.price_monthly}
                        className="flex items-center gap-2 rounded-2xl bg-[#7B1113] px-5 py-2.5 font-poppins text-sm font-semibold text-[#C6A971] transition hover:opacity-90 disabled:opacity-50"
                    >
                        {loading && <LoaderCircle size={15} className="animate-spin" />}
                        {editData ? "Simpan Perubahan" : "Tambah Kamar"}
                    </button>
                </div>
            </div>
        </div>
    );
}