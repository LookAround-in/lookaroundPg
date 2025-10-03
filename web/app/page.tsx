"use client";

import Link from "next/link";
import { Button } from "components/ui/button";
import { SearchBar } from "components/search/SearchBar";
import {
  Shield,
  Search,
  Star,
  Users,
  Building,
  MapPin,
  Smile,
  ShieldCheck,
  Clock,
  HandCoins,
} from "lucide-react";
import Featured from "@/components/properties/FeaturedProperties";
import Trending from "@/components/properties/TrendingProperties";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import LocationCard from "@/components/properties/LocationCard";

export default function HomePage() {
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

  const locations = [
    {
      imageUrl: "82a24a6c21f33f5b67bd4e7cbd58170eeeb1fb22.jpg",
      available: true,
      locationName: "Bengaluru",
      locationTagline: "Silicon Valley of India",
      propertyCount: 100,
      popularAreas: ["Koramangala", "Whitefield", "HSR Layout"],
    },
    {
      imageUrl: "9e1446df6ba430f04d81e6b84d77312e608e6b6a.jpg",
      available: false,
      locationName: "Hyderabad",
      locationTagline: "City of Pearls",
      propertyCount: 50,
      popularAreas: ["Banjara Hills", "Gachibowli", "Hitech City"],
    },
    {
      imageUrl: "c3dd39364c3508d0ad9972b9bf7934684392a8a9.jpg",
      available: false,
      locationName: "Chennai",
      locationTagline: "Gateway to South India",
      propertyCount: 50,
      popularAreas: ["Adyar", "T Nagar", "Velachery", "OMR"],
    }
  ]

  const stats = [
    { icon: Building, value: "500+", label: "Properties" },
    { icon: MapPin, value: "50+", label: "Locations" },
    { icon: Smile, value: "1000+", label: "Happy Tenants" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-background transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative isolate py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <img
            src="d1dd92063b3086d81244769ccd705b36cbb54747.jpg"
            alt="Cozy bedroom interior suitable for PG stay"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-9 px-2 lg:px-8 mb-12">
          <Badge variant="secondary" className="h-8 flex-1 max-w-48 flex items-center justify-center p-5">
            <ShieldCheck className="mr-2" />Verified Listings
          </Badge>
          <Badge variant="secondary" className="h-8 flex-1 max-w-48 flex items-center justify-center p-5">
            <Clock className="mr-2" />24/7 Support
          </Badge>
          <Badge variant="secondary" className="h-8 flex-1 max-w-48 flex items-center justify-center p-5">
            <HandCoins className="mr-2" />Best Price
          </Badge>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6"
          >
            Find Your Perfect{" "}
            <span className="text-gradient-cool drop-shadow-lg">
              PG Home
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-white mb-6"
          >
            Discover safe, comfortable, and affordable paying guest
            accommodations
          </motion.p>

          {/* Search Bar with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-2xl mx-auto mb-10 backdrop-blur-xl bg-gray-700/10 border border-gray-700/70 rounded-2xl shadow-lg p-8"
          >
            <SearchBar />
            <Link href="/explore">
              <Button className="bg-gradient-cool hover:bg-primary/90 text-white w-48 mt-8 py-6 rounded-xl shadow-lg font-semibold transition-all">
                Explore Properties
              </Button>
            </Link>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-x py-4 px-2 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 text-center"
              >
                <stat.icon className="mx-auto mb-1 text-white h-6 w-6 sm:h-8 sm:w-8" />
                <div className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-base text-gray-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoa mb-4 tracking-tight">
              Why Choose{" "}
              <span className="text-gradient-cool drop-shadow-lg">
                LookAroundPG
              </span>
              ?
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              We make finding the perfect PG accommodation simple, safe, and
              reliable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-14 h-14 bg-gradient-cool rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoa mb-4 tracking-tight">
              Choose Your City
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Find the perfect PG accommodation in your preferred city
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <LocationCard
                key={index}
                imageUrl={location.imageUrl}
                available={location.available}
                locationName={location.locationName}
                locationTagline={location.locationTagline}
                propertyCount={location.propertyCount}
                popularAreas={location.popularAreas}
              />
            ))}
          </div>
          <div className="bg-gray-100 mt-12 rounded-md p-6 text-center shadow-xl">
            <p className="text-lg md:text-xl text-gray-900 max-w-2xl mx-auto">
              Don`t see your city? we`re expanding rapidly!
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoa mt-4 tracking-tight">
              Coming Soon
            </h2>
          </div>
        </div>

      </section>

      {/* Featured + Trending */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Featured />
        <Trending />
      </div>

      {/* CTA */}
      <section className="relative py-16 sm:py-24 bg-[#ec4899]  overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">
                Own a Property? Partner with Us
              </h2>
              <p className="text-lg text-white/90 mb-6 max-w-lg mx-auto">
                List your PG and connect with thousands of potential tenants
              </p>
            </motion.div>

            {/* Call to action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/partner" className="w-full sm:flex-1">
                <Button className="w-full text-base px-6 py-3 sm:py-4 rounded-xl shadow-lg bg-white text-primary font-semibold hover:bg-gray-100 hover:shadow-xl transition-all">
                  List Your Property
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:flex-1">
                <Button
                  variant="outline"
                  className="w-full text-base px-6 py-3 sm:py-4 rounded-xl border-2 border-white text-primary font-semibold hover:bg-white/10 hover:text-white transition-all"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
