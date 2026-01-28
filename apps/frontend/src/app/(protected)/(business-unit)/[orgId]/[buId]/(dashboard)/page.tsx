import { redirect } from "next/navigation";

export default async function BusinessUnitRootPage({
  params,
  searchParams,
}: {
  params: Promise<{ buId: string; orgId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { orgId, buId } = await params;
  const sParams = await searchParams;
  const queryString = new URLSearchParams(sParams as any).toString();
  const destination = `/${orgId}/${buId}/dashboard${queryString ? `?${queryString}` : ""}`;

  redirect(destination);
}
