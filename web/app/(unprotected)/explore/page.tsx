import ExploreProperties from "@/components/explore/explore-properties";

export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ page?: string, search?: string }> }) {
    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams.page || "1", 10);
    const searchTerm = resolvedSearchParams.search || "";
    const limit = 12;
    return (
        <ExploreProperties 
            page={page} 
            limit={limit} 
            searchTerm={searchTerm}
        />
    );
}