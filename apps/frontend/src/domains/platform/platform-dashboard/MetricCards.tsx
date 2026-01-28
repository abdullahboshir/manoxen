import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  ShoppingCart,
  CreditCard,
  FileWarning,
  Undo2,
  ShoppingBag,
  Receipt,
} from "lucide-react";

export function MetricCards({ stats }: { stats: any }) {
  const formatValue = (val: any) => {
    if (typeof val === "object" && val !== null) {
      return `${val.currency || "৳"} ${val.total || "0.00"}`;
    }
    return val || "৳ 0.00";
  };

  const metrics = [
    {
      title: "Total Sales",
      value: formatValue(stats?.totalSales),
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Net",
      value: formatValue(stats?.net),
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Invoice Due",
      value: formatValue(stats?.invoiceDue),
      icon: FileWarning,
      color: "text-orange-600",
    },
    {
      title: "Total Sell Return",
      value: formatValue(stats?.totalSellReturn),
      icon: Undo2,
      color: "text-red-600",
    },
    {
      title: "Total Purchase",
      value: formatValue(stats?.totalPurchase),
      icon: ShoppingBag,
      color: "text-purple-600",
    },
    {
      title: "Purchase Due",
      value: formatValue(stats?.purchaseDue),
      icon: CreditCard,
      color: "text-yellow-600",
    },
    {
      title: "Total Purchase Return",
      value: formatValue(stats?.totalPurchaseReturn),
      icon: Undo2,
      color: "text-red-500",
    },
    {
      title: "Expense",
      value: formatValue(stats?.expense),
      icon: Receipt,
      color: "text-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="shadow-sm border-l-4"
          style={{ borderLeftColor: metric.color ? undefined : "transparent" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <metric.icon
              className={`h-4 w-4 ${metric.color || "text-muted-foreground"}`}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
