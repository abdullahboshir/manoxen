import { BlockRenderer } from "@/domains/commerce/storefront/ui/components/Renderer";
import StorefrontPageClient from "@/domains/commerce/storefront/ui/components/StorefrontPageClient";
// import { useGetStoreConfigQuery, useGetStorePageQuery } from "@/redux/api/storefront/storefrontApi";
// Note: We cannot use hooks directly in server component if we want SSR, but assuming client-side fetching for now for simplicity in this dashboard app context.
// Actually, let's make it a client component wrapper.



export default async function StorefrontPage({ params }: { params: Promise<{ buId: string, slug?: string[] }> }) {
    const { buId, slug } = await params;
    // Slug is an array in catch-all routes
    const pageSlug = slug ? slug.join('/') : 'home';

    return <StorefrontPageClient buId={buId} slug={pageSlug} />;
}
