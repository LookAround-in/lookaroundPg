"use client";
import React, { useState, useMemo } from "react";
import { PropertyCard } from "components/properties/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Badge } from "components/ui/badge";
import { Input } from "components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Home,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExploreApiResponse } from "@/interfaces/property";
import PropertySkeleton from "@/components/properties/PropertySkeleton";

const fetchProperties = async (): Promise<ExploreApiResponse> => {
  const response = await fetch("/api/v1/pg/getExplorePg", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const HostAllProperties = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // In a real app, these would be filtered by the logged-in host
  const data = useQuery<ExploreApiResponse>({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });
  // Extract the data array from the API response
  const properties = useMemo(() => {
    if (data.data && data.data.success) {
      return data.data.data || [];
    }
    return [];
  }, [data]);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && property.sharingTypes.length > 0) ||
      (filterStatus === "inactive" && !property.sharingTypes.length);
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: properties.length,
    active: properties.filter((p) => p.sharingTypes.length > 0).length,
    inactive: properties.filter((p) => !p.sharingTypes.length).length,
    totalViews: properties.reduce((sum, p) => sum + (p.reviews.length || 0), 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <Button
          variant="outline"
          onClick={() => router.push("/explore")}
          className="font-medium max-w-sm sm:w-auto mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Button>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                All Properties
              </h1>
              <p className="text-gray-600">Manage your property listings</p>
            </div>
          </div>
          <Link href={"/admin/addproperty"} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-gradient-cool text-white hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add New Property
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Properties
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <Home className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Listings
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.active}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inactive</p>
                  <p className="text-2xl font-bold text-gray-500">
                    {stats.inactive}
                  </p>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Views
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.totalViews}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Error State - Outside grid */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {(data.isLoading || data.isPending) &&
            // Show skeleton cards
            Array.from({ length: 6 }).map((_, index) => (
              <PropertySkeleton key={index} />
            ))}
        </div>

        {/* Properties Grid - Only show when data is loaded successfully */}
        {!data.isLoading && !data.isPending && !data.isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProperties &&
              filteredProperties.map((property, index) => (
                <div key={property.id} className="relative group">
                  <PropertyCard property={property} />

                  {/* Management Overlay */}
                  <div className="absolute top-3 right-12 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2.5 left-24">
                    <Badge
                      variant={
                        property.sharingTypes.length > 0
                          ? "default"
                          : "secondary"
                      }
                    >
                      {property.sharingTypes.length > 0 ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        )}

        {!data.isLoading && filteredProperties.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No properties found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by adding your first property listing."}
              </p>
              {!searchTerm && filterStatus === "all" && (
                <Button
                  className="bg-gradient-cool text-white hover:opacity-90"
                  onClick={() => router.push("/admin/addproperty")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Property
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HostAllProperties;
