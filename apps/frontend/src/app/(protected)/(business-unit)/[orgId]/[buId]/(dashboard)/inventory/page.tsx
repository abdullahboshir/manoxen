import { InventoryList } from "@/domains/erp/inventory/ui/components/InventoryList";

export default async function InventoryPage({ params }: { params: any }) {
  // Page acts as Gatekeeper: Orchestrates params and context before rendering
  const resolvedParams = await params;
  return <InventoryList context={resolvedParams} />;
}
