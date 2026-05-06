import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { collegeIds } = body;

    if (!Array.isArray(collegeIds) || collegeIds.length === 0 || collegeIds.length > 3) {
      return NextResponse.json({ error: "Please provide 1 to 3 college IDs" }, { status: 400 });
    }

    const colleges = await prisma.college.findMany({
      where: {
        id: { in: collegeIds },
      },
      include: {
        courses: true,
        placements: {
          orderBy: { year: "desc" },
          take: 1,
        },
      },
    });

    // Ensure we return them in the same order they were requested
    const sortedColleges = collegeIds
      .map(id => colleges.find(c => c.id === id))
      .filter(Boolean);

    return NextResponse.json({ colleges: sortedColleges });
  } catch (error) {
    console.error("Error comparing colleges:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
