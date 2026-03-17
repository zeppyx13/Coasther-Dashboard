import { Bell, Search } from "lucide-react";

export default function DashboardTopbar() {
    return (
        <header className="sticky top-0 z-10 border-b border-[#EAEAEA] bg-white/90 backdrop-blur">
            <div className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="font-inter text-sm text-[#666]">Selamat datang kembali</p>
                    <h2 className="font-poppins text-2xl font-bold text-[#2F2F2F]">
                        Dashboard Overview
                    </h2>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3">
                        <Search size={18} className="text-[#666]" />
                        <input
                            type="text"
                            placeholder="Cari data..."
                            className="w-40 bg-transparent font-inter text-sm outline-none placeholder:text-[#999]"
                        />
                    </div>

                    <button
                        type="button"
                        title="Notifications"
                        className="rounded-2xl border border-[#EAEAEA] bg-white p-3 transition hover:bg-[#F8F8F8]"
                    >
                        <Bell size={18} className="text-[#7B1113]" />
                    </button>
                </div>
            </div>
        </header>
    );
}