import { MarketingReports } from "@/domains/erp/analytics/ui/components/MarketingReports";

export default async function MarketingPage({ params }: { params: any }) {
  const resolvedParams = await params;
  return <MarketingReports context={resolvedParams} />;
}
