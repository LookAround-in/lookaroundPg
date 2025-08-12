import { Button } from "components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import AdminPropertyList from "../../../components/properties/admin-property-list";
import { fetchProperties } from "@/lib/api-server";

export default async function AdminProperties({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const limit = 12;
  
  // ✅ Handle SSR errors gracefully
  let propertiesData = null;
  let ssrError = null;
  
  try {
    propertiesData = await fetchProperties(page, limit);
  } catch (error) {
    console.error("SSR Error fetching properties:", error);
    ssrError = error;
  }

  return (
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
              <h1 className="text-2xl font-bold text-gray-900">All Properties</h1>
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

        <AdminPropertyList 
          page={page} 
          limit={limit} 
          explorePropertiesData={propertiesData}
        />
      </div>
    </div>
  );
}