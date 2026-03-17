import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("coasther_token")?.value;

    if (req.nextUrl.pathname.startsWith("/admin") && !token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (req.nextUrl.pathname === "/" && token) {
        return NextResponse.redirect(
            new URL("/dashboard", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard/:path*"],
};