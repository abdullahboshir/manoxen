import { redirect } from 'next/navigation';

export default async function BusinessUnitRootPage({ params, searchParams }: { 
  params: Promise<{ 'business-unit': string }>, 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const { 'business-unit': businessUnitId } = await params;
  const sParams = await searchParams;
  const queryString = new URLSearchParams(sParams as any).toString();
  const destination = `/${businessUnitId}/dashboard${queryString ? `?${queryString}` : ''}`;

  redirect(destination);
}
