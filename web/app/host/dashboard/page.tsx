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

  const stats = {
    totalProperties: 0,
    totalQueries: queries.length,
    pendingQueries: queries?.filter((q) => q.status === "PENDING").length,
    approvedQueries: queries?.filter((q) => q.status === "APPROVED").length,
    rejectedQueries: queries?.filter((q) => q.status === "REJECTED").length,
    occupancyRate: 0,
    monthlyRevenue: 0,
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
                {stats?.totalProperties}
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
                {stats?.totalQueries}
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
                {stats?.pendingQueries}
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
                  Coming soon! Manage your property availability and bookings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                
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
                    Coming Soon! Track your property inquiry performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  
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
