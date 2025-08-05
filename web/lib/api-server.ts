import { ExploreApiResponse, PropertyApiResponse } from "@/interfaces/property";

export function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  else return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const fetchProperties = async (page: number, limit: number): Promise<ExploreApiResponse> => {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/v1/pg/getExplorePg?page=${page}&limit=${limit}`
  const response = await fetch(url, {
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

export const fetchTrendingProperties = async (): Promise<PropertyApiResponse> => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/v1/pg/getTrendingPg`, {
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


export const fetchFeaturedProperties = async (): Promise<PropertyApiResponse> => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/v1/pg/getFeaturedPg`, {
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

export const fetchPropertyById = async (
  propertyId: string
): Promise<PropertyApiResponse> => {
  const baseUrl = getBaseUrl();
  if (!propertyId) {
    throw new Error("Pg Id is required");
  }
  const response = await fetch(`${baseUrl}/api/v1/pg/getPgById/${propertyId}`, {
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