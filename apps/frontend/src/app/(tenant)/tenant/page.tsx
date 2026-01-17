import Link from "next/link";

export default function TenantDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Organization Dashboard</h2>
      <p className="mb-8 text-gray-600">Welcome to your dedicated workspace.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="#" className="p-6 bg-blue-50 border border-blue-200 rounded hover:shadow-md transition">
          <h3 className="font-semibold text-blue-900">Catalog</h3>
        </Link>
        <Link href="#" className="p-6 bg-green-50 border border-green-200 rounded hover:shadow-md transition">
          <h3 className="font-semibold text-green-900">Sales</h3>
        </Link>
        <Link href="#" className="p-6 bg-purple-50 border border-purple-200 rounded hover:shadow-md transition">
          <h3 className="font-semibold text-purple-900">Inventory</h3>
        </Link>
         <Link href="#" className="p-6 bg-orange-50 border border-orange-200 rounded hover:shadow-md transition">
          <h3 className="font-semibold text-orange-900">Settings</h3>
        </Link>
      </div>
    </div>
  );
}
