import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ExploreProperties from "@/components/explore/explore-properties";
import { fetchProperties } from "@/lib/api";

export default async function Page({ searchParams }: { searchParams: { page?: string } }) {
    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams.page || "1", 10);
    const limit = 15; // Default limit, can be adjusted as needed
    const queryClient = getQueryClient();

    // await queryClient.prefetchQuery({
    //     queryKey: ["properties", page],
    //     queryFn: () => fetchProperties(page, limit),
    // });
    await queryClient.prefetchQuery({
        queryKey: ["properties"],
        queryFn: fetchProperties,
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ExploreProperties />
        </HydrationBoundary>
    )
}