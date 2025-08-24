import PropertySkeleton from "@/components/properties/PropertySkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-48"></div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filter skeleton */}
          <div className="w-full lg:w-80">
            <div className="animate-pulse bg-gray-200 rounded-lg h-96"></div>
          </div>
          
          {/* Properties grid skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <PropertySkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}