import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { exam, rank } = body;

    if (!exam || typeof rank !== "number") {
      return NextResponse.json({ error: "Exam and valid rank are required" }, { status: 400 });
    }

    const rules = await prisma.predictorRule.findMany({
      where: {
        exam,
        minRank: { lte: rank },
        maxRank: { gte: rank },
      },
      include: {
        college: {
          include: {
            placements: {
              orderBy: { year: "desc" },
              take: 1,
            },
          },
        },
      },
      orderBy: {
        college: { ranking: "asc" },
      },
      take: 20, // Return top 20 matches
    });

    // Group by chance
    const results = {
      High: rules.filter(r => r.chance === "High").map(r => r.college),
      Medium: rules.filter(r => r.chance === "Medium").map(r => r.college),
      Low: rules.filter(r => r.chance === "Low").map(r => r.college),
    };

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error predicting colleges:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
