
import LicenseForm from "@/domains/core/saas/ui/components/LicenseForm";

export const metadata = {
    title: "Issue License | Platform Admin",
    description: "Generate new license keys for clients.",
};

export default function NewLicensePage() {
    return <LicenseForm />;
}

