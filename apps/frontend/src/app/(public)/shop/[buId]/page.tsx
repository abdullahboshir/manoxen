import StorefrontPageClient from '@/domains/commerce/storefront/ui/components/StorefrontPageClient';

export default async function ShopRootPage({ params }: { params: Promise<{ buId: string }> }) {
    const { buId } = await params;
    // Default to 'home' slug when visiting the root store URL
    return <StorefrontPageClient buId={buId} slug="home" />;
}
