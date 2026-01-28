"use client";

import { useRouter } from "next/navigation";
import { UserForm } from "./UserForm";
import { useCreateUserMutation } from "@/domains/core/iam/api/userApi";
import { toast } from "sonner";
import { DataPageLayout } from "@/components/shared/DataPageLayout";
import { Button } from "@/components/ui/button";

export function AddPlatformUser() {
  const router = useRouter();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (data: any) => {
    try {
      await createUser(data).unwrap();
      toast.success("Platform user created successfully");
      router.push("/platform/user-management/platform-users");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create platform user");
    }
  };

  return (
    <DataPageLayout
      title="Add Platform User"
      description="Create a new administrator or support staff with global system access."
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
        targetScope="GLOBAL"
      />
    </DataPageLayout>
  );
}
