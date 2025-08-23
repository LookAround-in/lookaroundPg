import { PgServices } from "@/app/api/v1/pg/pgServices"; 

const pgService = new PgServices();

// direct DB call
export const fetchProperties = async (page: number, limit: number, searchTerm?: string) => {
  const result = await pgService.getExplorePgs(page, limit, searchTerm);
  return result;
};

// direct DB call
export const fetchTrendingProperties = async () => {
  const result = await pgService.getTrendingPgs();
  return result;
};

// direct DB call
export const fetchFeaturedProperties = async () => {
  const result = await pgService.getFeaturedPgs();
  return result;
};

// direct DB call
export const fetchPropertyById = async (propertyId: string) => {
  if (!propertyId) throw new Error("Pg Id is required");
  const result = await pgService.getPgById(propertyId);
  return {
    success: true,
    message: "Pg fetched successfully",
    data: result,
  };
};

export const fetchPropertyByHostId = async (hostId: string) => {
  if (!hostId) throw new Error("Host Id is required");
  const result = await pgService.getPgsByHostId(hostId);
  return {
    success: true,
    message: "Pg fetched successfully",
    data: result,
  };
};