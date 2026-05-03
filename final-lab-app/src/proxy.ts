import { NextRequest, NextResponse } from "next/server";

function isAdmin(request: NextRequest) {
  return request.cookies.get("portfolio_admin")?.value === "true";
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const protectedProjectManagerPage = pathname.startsWith("/manage");
  const protectedProjectApi = pathname.startsWith("/api/projects");

  const protectedRoute = protectedProjectManagerPage || protectedProjectApi;

  if (!protectedRoute) {
    return NextResponse.next();
  }

  if (isAdmin(request)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.json(
      { error: "Admin access required." },
      { status: 401 }
    );
  }

  const loginUrl = new URL("/admin", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/manage/:path*", "/api/projects/:path*"],
};