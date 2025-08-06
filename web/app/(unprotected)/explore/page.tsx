import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ExploreProperties from "@/components/explore/explore-properties";
import { fetchProperties } from "@/lib/api-server";

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams.page || "1", 10);
    const limit = 12;
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["properties", page],
        queryFn: () => fetchProperties(page, limit),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ExploreProperties page={page} limit={limit} />
        </HydrationBoundary>
    )
}