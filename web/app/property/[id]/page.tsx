'use client'
import {use} from 'react';
import { PropertyProvider } from "@/contexts/PropertyContext";
import PropertyDetails from "@/components/properties/PropertyDetails";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const {id} = use(params);
  return (
    <PropertyProvider propertyId={id}>
      <PropertyDetails />
    </PropertyProvider>
  );
}
