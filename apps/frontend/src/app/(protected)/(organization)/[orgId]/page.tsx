import { redirect } from "next/navigation";

export default async function OrganizationAdminPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  redirect(`/${orgId}/dashboard`);
}
