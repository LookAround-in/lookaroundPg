import { ExploreApiResponse } from "@/interfaces/property";

// export const fetchProperties = async (page: number, limit: number): Promise<ExploreApiResponse> => {
//   const response = await fetch(`/api/v1/pg/getExplorePg?page=${page}&limit=${limit}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return response.json();
// };


export const fetchProperties = async (): Promise<ExploreApiResponse> => {
  const response = await fetch("/api/v1/pg/getExplorePg", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export const fetchTrendingProperties = async (): Promise<ExploreApiResponse> => {
  const response = await fetch("/api/v1/pg/getTrendingPg", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trending properties");
  }

  return response.json();
};


export const fetchFeaturedProperties = async (): Promise<ExploreApiResponse> => {
  const response = await fetch("/api/v1/pg/getFeaturedPg", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch featured properties");
  }

  return response.json();
};