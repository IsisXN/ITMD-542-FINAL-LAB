import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const typedPasscode = String(body.passcode || "").trim();
    const savedPasscode = process.env.ADMIN_PASSCODE;

    if (!savedPasscode) {
      return NextResponse.json(
        { error: "Admin passcode is not configured." },
        { status: 500 }
      );
    }

    if (typedPasscode !== savedPasscode) {
      return NextResponse.json(
        { error: "Incorrect passcode." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("portfolio_admin", "true", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 4,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Could not check passcode." },
      { status: 500 }
    );
  }
}