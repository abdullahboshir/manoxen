"use client";

import { useRouter } from "next/navigation";
import { UserForm } from "./UserForm";
import { useCreateUserMutation } from "@/domains/core/iam/api/userApi";
import { toast } from "sonner";
import { DataPageLayout } from "@/components/shared/DataPageLayout";
import { Button } from "@/components/ui/button";

export function AddOrganizationUser() {
  const router = useRouter();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (data: any) => {
    try {
      await createUser(data).unwrap();
      toast.success("Organization user created successfully");
      router.back();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create organization user");
    }
  };

  return (
    <DataPageLayout
      title="Add Organization User"
      description="Create a new user with access scoped to this organization."
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
      />
    </DataPageLayout>
  );
}
