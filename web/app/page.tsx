import Link from "next/link";
import { Button } from "components/ui/button";
import { SearchBar } from "components/search/SearchBar";
import { Shield, Search, Star, Users } from "lucide-react";
import Featured from "@/components/properties/FeaturedProperties";
import Trending from "@/components/properties/TrendingProperties";
import { getQueryClient } from "@/lib/get-query-client";
import { fetchFeaturedProperties, fetchTrendingProperties } from "@/lib/api-server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function HomePage() {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["featuredProperties"],
      queryFn: fetchFeaturedProperties,
    }),
    queryClient.prefetchQuery({
      queryKey: ["trendingProperties"],
      queryFn: fetchTrendingProperties,
    })
  ])
  const dehydratedState = dehydrate(queryClient);

  const features = [
    {
      icon: Shield,
      title: "Verified Properties",
      description: "All listings are verified for safety and authenticity",
    },
    {
      icon: Search,
      title: "Transparent Pricing",
      description: "No hidden fees, clear pricing for all amenities",
    },
    {
      icon: Users,
      title: "Trusted Hosts",
      description: "Connect with verified, responsive property owners",
    },
    {
      icon: Star,
      title: "Easy Booking",
      description: "Simple process to find and secure your accommodation",
    },
  ];

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="min-h-screen bg-background transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-charcoa mb-6 animate-fadeInUp">
              Find Your Perfect{" "}
              <span className="text-gradient-cool">PG Home</span>
            </h1>
            <p
              className="text-xl text-gray-600 mb-8 animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              Discover safe, comfortable, and affordable paying guest
              accommodations
            </p>

            {/* Search Bar */}
            <div
              className="max-w-2xl mx-auto mb-8 animate-scaleIn"
              style={{ animationDelay: "0.4s" }}
            >
              <SearchBar />
            </div>

            {/* Quick Stats */}
            <div
              className="grid grid-cols-3 gap-8 max-w-md mx-auto text-center animate-fadeInUp"
              style={{ animationDelay: "0.6s" }}
            >
              <div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Properties</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-gray-600">Locations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-gray-600">Happy Tenants</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoa mb-4">
              Why Choose LookAroundPG?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make finding the perfect PG accommodation simple, safe, and
              reliable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-cool rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-charcoa mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties and Trending Properties*/}
      <Featured/>
      <Trending/>
      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-cool">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Own a Property? Partner with Us
          </h2>
          <p className="text-xl text-white/90 mb-8">
            List your PG and connect with thousands of potential tenants
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/partner">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                List Your Property
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 hover:text-primary"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </HydrationBoundary>
  );
};