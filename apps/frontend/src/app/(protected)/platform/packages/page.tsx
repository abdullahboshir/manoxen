import PackageList from "@/domains/core/saas/ui/components/PackageList";

export const metadata = {
    title: "SaaS Packages | Platform Admin",
    description: "Manage subscription plans and licensing.",
};

export default function PackagesPage() {
    return <PackageList />;
}

