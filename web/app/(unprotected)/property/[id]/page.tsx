import { fetchPropertyById } from "@/lib/api-server";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PropertyDetails from "components/properties/PropertyDetails";

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const {id} = resolvedParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
      queryKey: ["property", id],
      queryFn: () => fetchPropertyById(id),
  });
  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
          <PropertyDetails propertyId={id}/>
      </HydrationBoundary>
  );
}
