"use client";
import { BusinessUnitForm } from "@/domains/core/business-units/ui/components/BusinessUnitForm";

export default function NewBusinessUnitPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">New Business Unit</h1>
        <p className="text-muted-foreground">
          Add a new business unit to your organization
        </p>
      </div>
      <BusinessUnitForm />
    </div>
  );
}
