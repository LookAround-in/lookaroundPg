'use client'
import { Property, PropertyApiResponse } from "@/interfaces/property";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
const EditPropertyForm = dynamic(() => import("@/components/properties/EditPropertyForm"), { ssr: false });

const fetchPropertyById = async (
  propertyId: string
): Promise<PropertyApiResponse> => {
  if (!propertyId) {
    throw new Error("Pg Id is required");
  }
  const response = await fetch(`/api/v1/pg/getPgById/${propertyId}`, {
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

export default function EditProperty() {
    const params = useParams<{ id: string }>();
    const id = params?.id;

    const { data, refetch, isLoading, isPending, isError } = useQuery({
        queryKey: ["property", id],
        queryFn: () => fetchPropertyById(id),
        enabled: !!id,
    });

    const property: Property = useMemo(() => {
        if (isLoading || isPending) {
            return null;
        }

        if (isError || !data?.data) {
            console.error("Error fetching property:");
            return null;
        }
        // If data.data is an array, pick the first item; otherwise, use as is
        const response = Array.isArray(data.data) ? data.data[0] : data.data;
        return response;
    }, [data, isLoading, isPending, isError]);

    return (
        <div className="p-1 sm:p-0 flex items-center justify-center min-h-screen">
           <EditPropertyForm property={property} />
        </div>
    );
}