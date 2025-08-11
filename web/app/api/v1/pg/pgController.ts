import { NextResponse } from "next/server";
import { PgServices } from "./pgServices";
import { PgCreateInput } from "@/interfaces/pg";

export class PgController {
  private pgService: PgServices;

  constructor() {
    this.pgService = new PgServices();
  }

  createPg = async (pgData: Partial<PgCreateInput>) => {
    try {
      if (!pgData) {
        return NextResponse.json(
          {
            success: false,
            message: "Pg data is required",
          },
          { status: 400 }
        );
      }

      if (!pgData.title || !pgData.hostId || !pgData.address) {
        return NextResponse.json(
          {
            success: false,
            message: "Title, hostId, and address are required fields",
          },
          { status: 400 }
        );
      }

      if (!pgData.propertyType || !pgData.furnishing || !pgData.moveInStatus) {
        return NextResponse.json(
          {
            success: false,
            message: "PropertyType, furnishing, and moveInStatus are required",
          },
          { status: 400 }
        );
      }

      if (
        typeof pgData.latitude !== "number" ||
        typeof pgData.longitude !== "number"
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Latitude and longitude must be valid numbers",
          },
          { status: 400 }
        );
      }

      const newPg = await this.pgService.createPg(pgData as PgCreateInput);

      return NextResponse.json(
        {
          success: true,
          message: "Pg created successfully",
          data: newPg,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error in createPg controller:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to create Pg",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  };


  updatePg = async (pgData: Partial<PgCreateInput>, id: string) => {
    try {
      if (!id) {
        return NextResponse.json(
          {
            success: false,
            message: "PG ID is required",
          },
          { status: 400 }
        );
      }

      // No field validation - allow partial updates
      const updatedPg = await this.pgService.updatePg(id, pgData as PgCreateInput);

      return NextResponse.json(
        {
          success: true,
          message: "PG updated successfully",
          data: updatedPg,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in updatePg controller:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to update PG",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  };

  deletePg = async (req: Request, id: string) => {
    try {
      if (!id) {
        return NextResponse.json(
          {
            success: false,
            message: "Pg ID is required",
          },
          { status: 400 }
        );
      }
      const deletedPg = await this.pgService.deletePg(id);
      return NextResponse.json(
        {
          success: true,
          message: "Pg deleted successfully",
          data: deletedPg,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in deletePg controller:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete Pg",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  };

  getFeaturedPgs = async (req: Request) => {
    try {
      const featuredPgs = await this.pgService.getFeaturedPgs();

      return NextResponse.json(
        {
          success: true,
          message: "Featured PGs fetched successfully",
          data: featuredPgs,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in getFeaturedPgs controller:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch featured PGs",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  };

  getTrendingPgs = async (req: Request) => {
    try {
      const trendingPgs = await this.pgService.getTrendingPgs();

      return NextResponse.json(
        {
          success: true,
          message: "Trending PGs fetched successfully",
          data: trendingPgs,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in getTrendingPgs controller:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch trending PGs",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  };

  getExplorePgs = async (req: Request, page: number, limit: number) => {
    try {
      const explorePgs = await this.pgService.getExplorePgs(page, limit);
      return NextResponse.json(
        {
          success: true,
          message: "Explore PGs fetched successfully",
          data: explorePgs,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in getExplorePgs controller:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch explore PGs",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  };

  getPgById = async (req: Request, pgId: string) => {
    try {

      if (!pgId) {
        return NextResponse.json(
          {
            success: false,
            message: "Pg ID is required",
          },
          { status: 400 }
        );
      }

      const pgData = await this.pgService.getPgById(pgId);

      if (!pgData) {
        return NextResponse.json(
          {
            success: false,
            message: "Pg not found",
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Pg fetched successfully",
          data: pgData,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in getPgById controller:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch Pg",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  };

  getPgsByHostId = async (req: Request, hostId: string) => {
    try {
      if (!hostId) {
        return NextResponse.json(
          {
            success: false,
            message: "Host ID is required",
          },
          { status: 400 }
        );
      }

      const pgs = await this.pgService.getPgsByHostId(hostId);

      return NextResponse.json(
        {
          success: true,
          message: "PGs by Host ID fetched successfully",
          data: pgs,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in getPgsByHostId controller:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch PGs by Host ID",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  };
}
