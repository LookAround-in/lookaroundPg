'use client'
import { PropertyProvider } from "@/contexts/PropertyContext";
import PropertyDetails from "@/components/properties/PropertyDetails";

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default function PropertyPage({ params }: PropertyPageProps) {
  return (
    <PropertyProvider propertyId={params.id}>
      <PropertyDetails />
    </PropertyProvider>
  );
}
