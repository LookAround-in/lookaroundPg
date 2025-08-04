'use client';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card';
import { ExploreApiResponse, Property } from '@/interfaces/property'
import { Search } from 'lucide-react';
interface PropertyListProps{
  data: {
    isFetching: boolean;
    isLoading: boolean;
    isPending?: boolean;
    isError: boolean;
    error?: unknown;
    refetch: () => void;
    data: ExploreApiResponse;
  };
  filteredProperties: Property[];
}

function PropertyList({ data, filteredProperties }: PropertyListProps) {
  const isLoading = data.isLoading || data.isFetching || data.isPending;
  return (
    <div className="flex-1">
            {/* Error State */}
            {data.isError && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4 text-red-600">
                    Error loading properties
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {(data.error as Error)?.message ||
                      "Failed to load property details"}
                  </p>
                  <div className="space-x-4">
                    <Button onClick={() => data.refetch()}>Try Again</Button>
                  </div>
                </div>
              </div>
            )}
            {!isLoading && !data.isError && (
              <div>
                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                    {filteredProperties.map((property, index) => (
                      <div
                        key={property.id}
                        className="animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <PropertyCard property={property} className="h-full" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card className="text-center py-12 lg:py-16 ">
                    <CardContent>
                      <div className="w-20 lg:w-24 h-20 lg:h-24 bg-gradient-cool-light rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                        <Search className="h-10 lg:h-12 w-10 lg:w-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-semibold text-gray-600 mb-2">
                        No properties found
                      </h3>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto text-base">
                        We couldn't find any properties matching your criteria.
                        Try adjusting your filters to see more results.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
  )
}

export default PropertyList