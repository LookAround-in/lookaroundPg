import { fetchPropertyByHostId } from "@/lib/api-server";
import HostProperties from "@/components/hostproperties/host-details";
export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function HostPropertyPage({ params }: { params: Promise<{ hostId: string }> }) {
  const resolvedParams = await params;
  const { hostId } = resolvedParams;
  
  try {
    // Fetch data directly on server
    const hostPropertiesData = await fetchPropertyByHostId(hostId);
    
    return (
      <HostProperties 
        hostId={hostId}
        initialData={hostPropertiesData}
        error={null}
      />
    );
  } catch (error) {
    return (
      <HostProperties 
        hostId={hostId}
        initialData={null}
        error={error instanceof Error ? error.message : "Failed to load host properties"}
      />
    );
  }
}