export default async function EditProperty({ params }: { params: Promise<{ id: string }> }){
    const resolvedParams = await params;
    const {id} = resolvedParams;
    console.log(id);
    return (
        <>
            <h1>Edit Property</h1>
        </>
    )
}