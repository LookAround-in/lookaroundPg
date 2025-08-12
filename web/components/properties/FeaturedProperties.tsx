import { Property } from "@/interfaces/property";
import { PropertyCard } from "./PropertyCard";
import Link from "next/link";
import { Button } from "components/ui/button";
import { fetchFeaturedProperties } from "@/lib/api-server";

export default async function Featured() {
try {
  const response = await fetchFeaturedProperties();
  const featuredProperties: Property[] = response;
  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-charcoa mb-2">
                Featured Properties
              </h2>
              <p className="text-gray-600">
                Handpicked accommodations with excellent ratings
              </p>
            </div>
            <Link href="/explore">
              <Button variant="outline" className="">
                View All
              </Button>
            </Link>
          </div>
          {/* Success State */}
          {featuredProperties.length > 0 && (
              <>
                {/* Mobile Horizontal Scroll */}
                <div className="md:hidden">
                  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                    {featuredProperties.map((property, index) => (
                      <div
                        key={property.id}
                        className="flex-shrink-0 w-80 animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <PropertyCard property={property} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProperties.map((property, index) => (
                    <div
                      key={property.id}
                      className="animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
              </>
            )}
        </div>
      </section>
    </>
  );
} catch (error) {
  console.error("Error fetching trending properties:", error);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-charcoa mb-2">
                Featured Properties
            </h2>
            <p className="text-gray-600">
              Handpicked accommodations with excellent ratings
            </p>
          </div>
          <Link href="/explore">
            <Button variant="outline" className="">
              View All
            </Button>
          </Link>
        </div>
        {/* Error State */}
        <div className="text-center">
          <p className="text-lg text-red-600">
            Failed to load featured properties. Please try again later.
          </p>
        </div>
      </div>
    </section>
  );
 }
}
