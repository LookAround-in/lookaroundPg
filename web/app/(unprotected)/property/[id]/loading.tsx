export default function Loading(){
    return (
      <div className="min-h-screen bg-light-gray transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading skeleton */}
          <div className="flex justify-between items-center mb-6">
            <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery Skeleton */}
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="aspect-[16/10] bg-gray-200 animate-pulse"></div>
              </div>

              {/* Property Info Skeleton */}
              <div className="bg-white rounded-lg p-6">
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg">
                    <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Additional skeleton cards */}
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              {/* Host Profile Skeleton */}
              <div className="bg-white rounded-lg p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="space-y-3">
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}