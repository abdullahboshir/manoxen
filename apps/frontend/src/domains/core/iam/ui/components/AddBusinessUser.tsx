"use client";

import { useRouter, useParams } from "next/navigation";
import { UserForm } from "./UserForm";
import { useCreateUserMutation } from "@/domains/core/iam/api/userApi";
import { toast } from "sonner";
import { DataPageLayout } from "@/components/shared/DataPageLayout";
import { Button } from "@/components/ui/button";

export function AddBusinessUser() {
  const router = useRouter();
  const params = useParams();
  const buIdOrSlug = (params?.buId || params["business-unit"]) as string;
  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (data: any) => {
    try {
      await createUser(data).unwrap();
      toast.success("Business user created successfully");
      router.back();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create business user");
    }
  };

  return (
    <DataPageLayout
      title="Add Business User"
      description="Create a new staff member or user for a specific business unit or outlet."
      action={
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      }
    >
      <UserForm
        mode="create"
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        onCancel={() => router.back()}
        targetScope="BUSINESS"
        initialBusinessUnitSlug={buIdOrSlug}
      />
    </DataPageLayout>
  );
}
