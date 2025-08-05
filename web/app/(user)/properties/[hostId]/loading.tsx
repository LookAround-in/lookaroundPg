export default function LoadingSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white animate-pulse">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                {/* Back button skeleton */}
                <div className="mb-6 w-32 h-10 bg-gray-200 rounded flex items-center" />

                {/* Host Profile Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
                    {/* Main Profile Card Skeleton */}
                    <div className="lg:col-span-2 border rounded-lg bg-white">
                        <div className="p-6 lg:p-8">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-6">
                                {/* Avatar Skeleton */}
                                <div className="relative">
                                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 p-1" />
                                </div>
                                {/* Info Skeleton */}
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                                        <div>
                                            <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
                                            <div className="flex items-center space-x-2 mb-3">
                                                <div className="h-6 w-20 bg-gray-200 rounded" />
                                                <div className="h-6 w-24 bg-gray-200 rounded" />
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                                <div className="h-6 w-32 bg-gray-200 rounded" />
                                                <div className="h-6 w-32 bg-gray-200 rounded" />
                                                <div className="h-6 w-32 bg-gray-200 rounded" />
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-4 sm:mt-0 bg-yellow-50 px-3 py-2 rounded-lg">
                                            <div className="h-5 w-16 bg-gray-200 rounded" />
                                        </div>
                                    </div>
                                    {/* Contact Buttons Skeleton */}
                                    <div className="flex flex-wrap gap-3">
                                        <div className="h-10 w-32 bg-gray-200 rounded" />
                                        <div className="h-10 w-32 bg-gray-200 rounded" />
                                        <div className="h-10 w-32 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Quick Stats Skeleton */}
                    <div className="border rounded-lg bg-white">
                        <div className="p-6">
                            <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="h-4 w-24 bg-gray-200 rounded" />
                                            <div className="h-4 w-12 bg-gray-200 rounded" />
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded w-full" />
                                    </div>
                                ))}
                                <div className="pt-2 border-t border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <div className="h-4 w-24 bg-gray-200 rounded" />
                                        <div className="h-4 w-16 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
