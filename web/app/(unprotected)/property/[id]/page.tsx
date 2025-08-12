import { fetchPropertyById } from "@/lib/api-server";
import PropertyDetails from "@/components/propertydetails/PropertyDetails";
export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  try {
    // Fetch data directly
    const propertyData = await fetchPropertyById(id);
    
    return (
      <PropertyDetails 
        propertyId={id} 
        initialData={propertyData}
        error={null}
      />
    );
  } catch (error) {
    return (
      <PropertyDetails 
        propertyId={id} 
        initialData={null}
        error={error instanceof Error ? error.message : "Failed to load property"}
      />
    );
  }
}
