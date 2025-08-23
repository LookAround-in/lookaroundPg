import ExploreProperties from "@/components/explore/explore-properties";
import { fetchProperties } from "@/lib/api-server";
export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ page?: string, search?: string }> }) {
    try {
        const resolvedSearchParams = await searchParams;
        const page = parseInt(resolvedSearchParams.page || "1", 10);
        const searchTerm = resolvedSearchParams.search || "";
        const limit = 12;
        const propertiesData = await fetchProperties(page, limit, searchTerm);
        return (
            <ExploreProperties 
                page={page} 
                limit={limit} 
                explorePropertiesData={propertiesData}
                isLoading={false}
                error={null}
            />
        );
    } catch (error) {
        return (
            <ExploreProperties 
                page={1} 
                limit={12} 
                explorePropertiesData={null}
                isLoading={false}
                error={error instanceof Error ? error.message : "Failed to load properties"}
            />
        );
    }
}