import PropertyDetails from "components/properties/PropertyDetails";

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const {id} = resolvedParams;
  return (
      <PropertyDetails propertyId={id}/>
  );
}
