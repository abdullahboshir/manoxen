"use client";

import { useRouter, useParams } from "next/navigation";
import { UserForm } from "./UserForm";
import {
  useUpdateUserMutation,
  useGetSingleUserQuery,
} from "@/domains/core/iam/api/userApi";
import { toast } from "sonner";
import { DataPageLayout } from "@/components/shared/DataPageLayout";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export function EditUser() {
  const router = useRouter();
  const params = useParams();
  const userId = (params.userId || params.id) as string;

  const { data: userData, isLoading: isLoadingUser } = useGetSingleUserQuery(
    userId,
    {
      skip: !userId,
    },
  );
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleSubmit = async (data: any) => {
    try {
      await updateUser({ id: userId, data }).unwrap();
      toast.success("User updated successfully");
      router.back();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update user");
    }
  };

  if (isLoadingUser) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const user = userData?.data || userData?.result || userData;

  return (
    <DataPageLayout
      title="Edit User"
      description="Update user information, roles, and permissions."
      action={
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      }
    >
      <UserForm
        mode="edit"
        initialData={user}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        onCancel={() => router.back()}
      />
    </DataPageLayout>
  );
}
