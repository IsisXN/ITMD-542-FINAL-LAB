import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.projectEntry.findMany({
    orderBy: [{ organization: "asc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const project = await prisma.projectEntry.create({
      data: {
        title: body.title,
        organization: body.organization,
        description: body.description,
        imageUrl: body.imageUrl || null,
        displayOrder: Number(body.displayOrder) || 0,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create project entry." },
      { status: 500 }
    );
  }
}