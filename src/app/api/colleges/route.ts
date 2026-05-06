import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";
    const state = searchParams.get("state") || "";
    const minFees = parseInt(searchParams.get("minFees") || "0");
    const maxFees = parseInt(searchParams.get("maxFees") || "9999999");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const sortBy = searchParams.get("sortBy") || "ranking";

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }
    if (type) {
      where.type = type;
    }
    if (state) {
      where.state = state;
    }
    where.fees = { gte: minFees, lte: maxFees };

    let orderBy: any = {};
    if (sortBy === "ranking") orderBy = { ranking: "asc" };
    if (sortBy === "fees_low") orderBy = { fees: "asc" };
    if (sortBy === "fees_high") orderBy = { fees: "desc" };
    if (sortBy === "rating") orderBy = { rating: "desc" };

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          courses: { take: 2 },
          placements: {
            orderBy: { year: "desc" },
            take: 1,
          },
        },
      }),
      prisma.college.count({ where }),
    ]);

    return NextResponse.json({
      colleges,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
