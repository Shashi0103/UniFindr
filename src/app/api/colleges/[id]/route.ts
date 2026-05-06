import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const collegeId = parseInt(id);

    if (isNaN(collegeId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const college = await prisma.college.findUnique({
      where: { id: collegeId },
      include: {
        courses: true,
        placements: {
          orderBy: { year: "desc" },
        },
        reviews: {
          orderBy: { date: "desc" },
        },
        predictorRules: true,
      },
    });

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    // Find similar colleges
    const similarColleges = await prisma.college.findMany({
      where: {
        id: { not: collegeId },
        type: college.type,
      },
      take: 4,
      orderBy: { ranking: "asc" },
    });

    return NextResponse.json({ college, similarColleges });
  } catch (error) {
    console.error("Error fetching college detail:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
