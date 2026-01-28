import { BusinessUnitForm } from "@/domains/core/business-units/ui/components/BusinessUnitForm";

export default async function EditBusinessUnitPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <div className="container mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Edit Business Unit</h1>
                <p className="text-muted-foreground">Update business unit details and settings</p>
            </div>
            <BusinessUnitForm slug={slug} />
        </div>
    );
}
