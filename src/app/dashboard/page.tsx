export default function AdminDashboardPage() {
    return (
        <main className="min-h-screen bg-[#FAFAFA] p-6">
            <div className="rounded-3xl border border-[#EAEAEA] bg-white p-8 shadow-sm">
                <p className="font-inter text-sm uppercase tracking-[0.18em] text-[#7B1113]">
                    Admin Dashboard
                </p>
                <h1 className="mt-3 font-poppins text-3xl font-bold text-[#2F2F2F]">
                    Selamat datang di Coasther Admin
                </h1>
                <p className="mt-3 font-inter text-sm leading-6 text-[#666]">
                    Login sudah berhasil diimplementasikan. Selanjutnya kita bisa buat
                    layout dashboard utama dengan side panel.
                </p>
            </div>
        </main>
    );
}