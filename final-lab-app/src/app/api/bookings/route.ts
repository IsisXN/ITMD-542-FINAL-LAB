import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const bookings = await prisma.bookingRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const booking = await prisma.bookingRequest.create({
      data: {
        name: body.name,
        email: body.email,
        requestType: body.requestType,
        preferredDate: body.preferredDate || null,
        message: body.message,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create booking request." },
      { status: 500 }
    );
  }
}