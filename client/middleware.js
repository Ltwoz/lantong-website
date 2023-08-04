import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies?.get("token").value;

    if (req.nextUrl.pathname.startsWith("/auth")) {
        if (token) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
}

export const config = { matcher: ["/dashboard/:path*", "/auth/:path*"] };
