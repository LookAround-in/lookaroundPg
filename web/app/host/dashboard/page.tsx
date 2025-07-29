"use client";
import React, { useState } from "react";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Badge } from "components/ui/badge";
import { Switch } from "components/ui/switch";
import { Label } from "components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { useToast } from "hooks/use-toast";
import {
  Home,
  Users,
  Bell,
  Settings,
  Check,
  X,
  Plus,
  Minus,
  Clock,
  ExternalLink,
} from "lucide-react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { PropertyRequestsApiResponse } from "@/interfaces/property";
import { HostRequest } from "@/interfaces/property";
import { error } from "console";
import { useRouter } from "next/navigation";

interface UserQuery {
  id: string;
  userName: string;
  userEmail: string;
  propertyId: string;
  propertyTitle: string;
  sharingType: "single" | "double" | "triple";
  message: string;
  timestamp: string;
  status: "pending" | "approved" | "rejected";
}

interface PropertyAvailability {
  id: string;
  title: string;
  type: "co-living" | "men" | "women";
  availability: {
    single: boolean;
    double: boolean;
    triple: boolean;
  };
  capacity: {
    single: number;
    double: number;
    triple: number;
  };
}

const getPropertyQueries = async (
  hostId: string
): Promise<PropertyRequestsApiResponse> => {
  if (!hostId) {
    throw new Error("Host ID is required to fetch property queries.");
  }
  const response = await fetch(`/api/v1/pgrequest/${hostId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch property queries");
  }
  return response.json();
};
const handlePropertyQueries = async (endpoint: string, queryId: string) => {
  if (!endpoint) {
    throw new Error("Endpoint is required to handle property queries.");
  }
  if (!queryId) {
    throw new Error("Query ID is required to handle property queries.");
  }
  const response = await fetch(`/api/v1/pgrequest/${endpoint}/${queryId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to ${endpoint} query: ${errorText}`);
  }
  return response.json();
};

const HostDashboard = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [properties, setProperties] = useState<PropertyAvailability[]>([
    {
      id: "1",
      title: "Modern Co-living Space in Koramangala",
      type: "co-living",
      availability: {
        single: true,
        double: false,
        triple: true,
      },
      capacity: {
        single: 5,
        double: 3,
        triple: 2,
      },
    },
    {
      id: "2",
      title: "Premium Ladies PG with Meals",
      type: "women",
      availability: {
        single: true,
        double: true,
        triple: false,
      },
      capacity: {
        single: 8,
        double: 4,
        triple: 0,
      },
    },
  ]);

  // TODO: Replace with actual user ID from context or auth
  const userId = "016eff1d-c5c7-48f4-a9f5-75a361d9030c";

  const { data: queriesData, isLoading: loading } = useQuery({
    queryKey: ["propertyQueries", userId],
    queryFn: () => getPropertyQueries(userId),
    enabled: !!userId,
  });
  const queries: HostRequest[] = queriesData?.data || [];

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      endpoint,
      queryId,
    }: {
      endpoint: string;
      queryId: string;
    }) => handlePropertyQueries(endpoint, queryId),
    onSuccess: async (data, variables) => {
      const action = variables.endpoint === "accept" ? "APPROVE" : "REJECT";
      toast({
        title: `Query ${action === "APPROVE" ? "Approved" : "Rejected"}`,
        description: `User query has been ${
          action === "APPROVE" ? "approved" : "rejected"
        } successfully.`,
      });
      await queryClient.invalidateQueries({
        queryKey: ["propertyQueries", userId],
        exact: true,
      });
    },
    onError: (error: Error) => {
      console.error(`Error query:`, error);
      toast({
        title: "Error",
        description: `Failed to process the query. Please try again.`,
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["propertyQueries", userId],
      });
    },
  });

  const handleQueryAction = async (
    queryId: string,
    action: "APPROVE" | "REJECT"
  ) => {
    const endpoint = action === "APPROVE" ? "accept" : "reject";
    mutate({ endpoint, queryId });
  };

  const handleAvailabilityChange = (
    propertyId: string,
    sharingType: keyof PropertyAvailability["availability"],
    value: boolean
  ) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              availability: {
                ...property.availability,
                [sharingType]: value,
              },
            }
          : property
      )
    );

    toast({
      title: "Availability Updated",
      description: `${sharingType} sharing availability has been updated.`,
    });
  };

  const handleCapacityChange = (
    propertyId: string,
    sharingType: keyof PropertyAvailability["capacity"],
    change: number
  ) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              capacity: {
                ...property.capacity,
                [sharingType]: Math.max(
                  0,
                  property.capacity[sharingType] + change
                ),
              },
            }
          : property
      )
    );

    toast({
      title: "Capacity Updated",
      description: `${sharingType} sharing capacity has been updated.`,
    });
  };

  const stats = {
    totalProperties: 5,
    totalQueries: queries,
    pendingQueries: queries?.filter((q) => q.status === "PENDING").length,
    occupancyRate: 78,
    monthlyRevenue: 125000,
  };

  return (
    <div className="min-h-screen bg-light-gray py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-charcoal">Host Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Manage your properties and guest queries.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="gradient-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gradient-cool">
                {stats.totalProperties}
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gradient-cool">
                {stats.totalQueries?.length}
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {stats.pendingQueries}
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Occupancy Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {stats.occupancyRate}%
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gradient-cool">
                ₹{stats.monthlyRevenue.toString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="queries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="queries">User Queries</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="queries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-cool rounded-lg flex items-center justify-center">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  User Queries & Requests
                </CardTitle>
                <CardDescription>
                  Manage incoming queries from potential guests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading && (
                    <div className="text-center text-gray-500">
                      Loading queries...
                    </div>
                  )}
                  {!loading && queries.length === 0 && (
                    <div className="text-center text-gray-500">
                      No queries found...
                    </div>
                  )}
                  {!loading &&
                    queries?.map((query) => (
                      <div
                        key={query.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-charcoal">
                              {query.user.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {query.user.email}
                            </p>
                          </div>
                            <Badge
                              variant={
                                query.status === "PENDING"
                                  ? "default"
                                  : query.status === "APPROVED"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {query.status}
                          </Badge>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {query.pgData.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            Interested in:{" "}
                            <span className="font-medium capitalize">
                              {query.pgData.propertyType} sharing
                            </span>
                          </p>
                        </div>

                        {/* <p className="text-sm bg-gray-50 p-3 rounded">
                        {query.}
                      </p> */}

                        {query.status === "PENDING" && (
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleQueryAction(query.id, "APPROVE")
                              }
                              className="bg-green-500 hover:bg-green-600 rounded-full"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              {isPending ? "Processing..." : "Approve"}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleQueryAction(query.id, "REJECT")
                              }
                              className="rounded-full"
                            >
                              <X className="w-4 h-4 mr-1" />
                              {isPending ? "Processing..." : "Reject"}
                            </Button>
                            
                          </div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                              size="sm"
                              onClick={() => {
                                router.push(`/property/${query.pgId}`);
                              }}
                              className="bg-gradient-cool hover:bg-primary rounded-full"
                            >
                              {"Property"}
                              <ExternalLink className="w-4 h-4 mr-1" />
                            </Button>
                        </div>
                        
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-cool rounded-lg flex items-center justify-center">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  Property Availability Management
                </CardTitle>
                <CardDescription>
                  Update room availability and capacity for your properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {properties.map((property) => (
                    <div key={property.id} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-charcoal mb-4">
                        {property.title}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Single Sharing */}
                        <div className="space-y-4">
                          <Label className="text-sm font-medium">
                            Single Sharing
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={property.availability.single}
                              onCheckedChange={(value) =>
                                handleAvailabilityChange(
                                  property.id,
                                  "single",
                                  value
                                )
                              }
                            />
                            <span className="text-sm text-gray-600">
                              {property.availability.single
                                ? "Available"
                                : "Not Available"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleCapacityChange(property.id, "single", -1)
                              }
                              disabled={property.capacity.single === 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="min-w-[3rem] text-center font-medium">
                              {property.capacity.single}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleCapacityChange(property.id, "single", 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            Available rooms
                          </p>
                        </div>

                        {/* Double Sharing */}
                        <div className="space-y-4">
                          <Label className="text-sm font-medium">
                            Double Sharing
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={property.availability.double}
                              onCheckedChange={(value) =>
                                handleAvailabilityChange(
                                  property.id,
                                  "double",
                                  value
                                )
                              }
                            />
                            <span className="text-sm text-gray-600">
                              {property.availability.double
                                ? "Available"
                                : "Not Available"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleCapacityChange(property.id, "double", -1)
                              }
                              disabled={property.capacity.double === 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="min-w-[3rem] text-center font-medium">
                              {property.capacity.double}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleCapacityChange(property.id, "double", 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            Available rooms
                          </p>
                        </div>

                        {/* Triple Sharing */}
                        <div className="space-y-4">
                          <Label className="text-sm font-medium">
                            Triple Sharing
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={property.availability.triple}
                              onCheckedChange={(value) =>
                                handleAvailabilityChange(
                                  property.id,
                                  "triple",
                                  value
                                )
                              }
                            />
                            <span className="text-sm text-gray-600">
                              {property.availability.triple
                                ? "Available"
                                : "Not Available"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleCapacityChange(property.id, "triple", -1)
                              }
                              disabled={property.capacity.triple === 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="min-w-[3rem] text-center font-medium">
                              {property.capacity.triple}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleCapacityChange(property.id, "triple", 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            Available rooms
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-cool rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    Query Analytics
                  </CardTitle>
                  <CardDescription>
                    Track your property inquiry performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 mb-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <div>
                        <span className="text-sm font-medium text-gray-600">
                          Total Queries This Month
                        </span>
                        <div className="text-2xl font-bold text-blue-600">
                          47
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bell className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        32
                      </div>
                      <div className="text-xs font-medium text-green-700">
                        Approved
                      </div>
                    </div>

                    <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Clock className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="text-2xl font-bold text-orange-600">
                        8
                      </div>
                      <div className="text-xs font-medium text-orange-700">
                        Pending
                      </div>
                    </div>

                    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <X className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="text-2xl font-bold text-red-600">7</div>
                      <div className="text-xs font-medium text-red-700">
                        Rejected
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className=" flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-cool rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    Popular Sharing Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-lg">
                        <span>Single Sharing</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-lg">
                        <span>Double Sharing</span>
                        <span>35%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-lg">
                        <span>Triple Sharing</span>
                        <span>20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HostDashboard;
