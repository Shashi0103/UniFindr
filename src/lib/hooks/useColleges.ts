import { useInfiniteQuery } from "@tanstack/react-query";
import { College, Course, Placement } from "@prisma/client";

export type CollegeWithDetails = College & {
  courses: Course[];
  placements: Placement[];
};

interface FetchCollegesResponse {
  colleges: CollegeWithDetails[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface UseCollegesParams {
  search?: string;
  type?: string;
  state?: string;
  minFees?: number;
  maxFees?: number;
  sortBy?: string;
}

export function useColleges(params: UseCollegesParams) {
  return useInfiniteQuery({
    queryKey: ["colleges", params],
    queryFn: async ({ pageParam = 1 }) => {
      const searchParams = new URLSearchParams();
      searchParams.append("page", pageParam.toString());
      
      if (params.search) searchParams.append("search", params.search);
      if (params.type) searchParams.append("type", params.type);
      if (params.state) searchParams.append("state", params.state);
      if (params.minFees) searchParams.append("minFees", params.minFees.toString());
      if (params.maxFees) searchParams.append("maxFees", params.maxFees.toString());
      if (params.sortBy) searchParams.append("sortBy", params.sortBy);

      const res = await fetch(`/api/colleges?${searchParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch colleges");
      return (await res.json()) as FetchCollegesResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => 
      lastPage.pagination.page < lastPage.pagination.totalPages 
        ? lastPage.pagination.page + 1 
        : undefined,
  });
}
