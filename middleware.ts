import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // 🔐 1️⃣ AdminDashboard protection
  if (pathname.startsWith("/admindashboard")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/adminlogin", req.url));
    }
  }

  // 🔁 2️⃣ AdminLogin protection (already logged in)
  if (pathname.startsWith("/adminlogin")) {
    if (token && token.role === "admin") {
      return NextResponse.redirect(new URL("/admindashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admindashboard/:path*", "/adminlogin"],
};
