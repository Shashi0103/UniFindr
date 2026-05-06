import { useQuery } from "@tanstack/react-query";
import { College, Course, Placement, Review, PredictorRule } from "@prisma/client";

export type FullCollegeDetails = College & {
  courses: Course[];
  placements: Placement[];
  reviews: Review[];
  predictorRules: PredictorRule[];
};

interface CollegeResponse {
  college: FullCollegeDetails;
  similarColleges: College[];
}

export function useCollege(id: string) {
  return useQuery({
    queryKey: ["college", id],
    queryFn: async () => {
      const res = await fetch(`/api/colleges/${id}`);
      if (!res.ok) throw new Error("Failed to fetch college details");
      return (await res.json()) as CollegeResponse;
    },
    enabled: !!id,
  });
}
