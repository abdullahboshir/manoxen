import { redirect } from "next/navigation";

export default async function UserManagementPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  // Redirect to Business Users within the organization context
  redirect(`/${orgId}/user-management/business-users`);
}
