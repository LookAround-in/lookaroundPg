import { fetchPropertyByHostId } from "@/lib/api-server";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import HostProperties from "@/components/hostproperties/host-details";

export default async function PropertyPage({ params }: { params: Promise<{ hostId: string }> }) {
  const resolvedParams = await params;
  const { hostId } = resolvedParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
      queryKey: ["property", hostId],
      queryFn: () => fetchPropertyByHostId(hostId),
  });
  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
          <HostProperties hostId={hostId}/>
      </HydrationBoundary>
    </Suspense>
  );
}