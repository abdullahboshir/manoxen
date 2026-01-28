import IntegrationList from "@/domains/core/integrations/ui/components/IntegrationList";

export const metadata = {
    title: "Integrations | Platform",
    description: "Manage 3rd party integrations.",
};

export default function IntegrationsPage() {
    return <IntegrationList />;
}

