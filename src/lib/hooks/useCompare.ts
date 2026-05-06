import { useQuery } from "@tanstack/react-query";
import { College, Course, Placement } from "@prisma/client";

export type CompareCollegeDetails = College & {
  courses: Course[];
  placements: Placement[];
};

interface CompareResponse {
  colleges: CompareCollegeDetails[];
}

export function useCompare(collegeIds: number[]) {
  return useQuery({
    queryKey: ["compare", collegeIds],
    queryFn: async () => {
      if (collegeIds.length === 0) return { colleges: [] };
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeIds }),
      });
      if (!res.ok) throw new Error("Failed to fetch compare data");
      return (await res.json()) as CompareResponse;
    },
    enabled: true,
  });
}
