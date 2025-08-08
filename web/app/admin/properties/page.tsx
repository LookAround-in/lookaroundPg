import { Button } from "components/ui/button";
import {ArrowLeft,Plus} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminPropertyList from "./admin-property-list";
import { getQueryClient } from "@/lib/get-query-client";
import { fetchProperties } from "@/lib/api-server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function HostAllProperties({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const limit = 12;
  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery({
  //     queryKey: ["properties", page],
  //     queryFn: () => fetchProperties(page, limit),
  // });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <form action="/explore" method="get">
          <Button
            variant="outline"
            type="submit"
            className="font-medium max-w-sm sm:w-auto mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>
        </form>
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
        <AdminPropertyList page={page} limit={limit} />
      </div>
    </div>
    // </HydrationBoundary>
  );
};