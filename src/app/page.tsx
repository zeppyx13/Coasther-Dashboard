import Image from "next/image";
import LoginForm from "@/components/loginform";
type BackgroundResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    url: string;
    blur?: string;
    credit?: {
      name: string;
      username: string;
      link: string;
    };
  };
};

async function getBackgroundImage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"}/api/unsplash/background`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch background");
    }

    const result: BackgroundResponse = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("Background fetch error:", error);
    return null;
  }
}

export default async function Home() {
  const background = await getBackgroundImage();

  return (
    <main className="min-h-screen bg-white text-[#2F2F2F]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden lg:block">
          {background?.url ? (
            <Image
              src={background.url}
              alt="Coasther background"
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#EAEAEA]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-br from-[#2F2F2F]/55 via-[#7B1113]/45 to-[#2F2F2F]/65" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
            <div>
              <p className="font-poppins text-sm font-semibold tracking-[0.2em] text-[#C6A971]">
                COASTHER DASHBOARD
              </p>
              <h1 className="mt-4 max-w-lg font-poppins text-4xl font-bold leading-tight">
                Dashboard pengelolaan smart kost-an modern dan efisien
              </h1>
              <p className="mt-4 max-w-md font-inter text-sm leading-7 text-white/85">
                Kelola kamar, penghuni, dan aktivitas sistem dalam satu panel
                admin yang terstruktur dan nyaman digunakan.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-md">
                <p className="font-inter text-sm text-[#C6A971]">
                  Minimalis • Elegan • Modern
                </p>
                <h2 className="mt-2 font-poppins text-2xl font-semibold text-white">
                  Smart Kost Low Costh
                </h2>
              </div>

              {background?.credit?.name && (
                <p className="font-inter text-xs text-white/70">
                  Photo by {background.credit.name}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-white px-6 py-10 sm:px-10">
          <div className="w-full max-w-md rounded-[28px] border border-[#EAEAEA] bg-white p-8 shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
            <div className="mb-8">
              <p className="font-inter text-sm font-medium uppercase tracking-[0.18em] text-[#7B1113]">
                Admin Login
              </p>
              <h2 className="mt-3 font-poppins text-3xl font-bold text-[#2F2F2F]">
                Login ke Dashboard
              </h2>
              <p className="mt-3 font-inter text-sm leading-6 text-[#666]">
                Silahkan login menggunakan akun admin Anda untuk mengelola sistem Coasther dengan mudah dan efisien.
              </p>
            </div>

            <LoginForm />

            <div className="mt-8 rounded-2xl bg-[#F8F8F8] p-4">
              <p className="font-inter text-xs leading-6 text-[#666]">
                Panel ini hanya untuk admin Coasther. Jika Anda bukan admin, silakan download aplikasi Coasther untuk pengguna biasa di{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.coasther.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#7B1113] underline transition hover:opacity-80"
                >
                  Google Play Store
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}