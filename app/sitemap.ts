import { sitemapService } from "@/services/sitemapService";

const frontendUrl = "https://hutzdiecast.com/";

const staticRoutes = [
  { url: `${frontendUrl}`, priority: 1.0 },
  { url: `${frontendUrl}collections`, priority: 0.9 },
  { url: `${frontendUrl}pages/about-us`, priority: 0.6 },
  { url: `${frontendUrl}pages/contact-us`, priority: 0.7 },
  { url: `${frontendUrl}pages/cancellation-and-refund-policy`, priority: 0.5 },
  { url: `${frontendUrl}pages/shipping-policy`, priority: 0.5 },
  { url: `${frontendUrl}pages/privacy-policy`, priority: 0.5 },
  { url: `${frontendUrl}pages/terms-of-service`, priority: 0.5 },
  { url: `${frontendUrl}account?tab=profile`, priority: 0.3 },
  { url: `${frontendUrl}account?tab=address`, priority: 0.3 },
  { url: `${frontendUrl}account?tab=orders`, priority: 0.3 },
  { url: `${frontendUrl}account?tab=wishlist`, priority: 0.3 },
  { url: `${frontendUrl}auth/register`, priority: 0.3 },
  { url: `${frontendUrl}auth/login`, priority: 0.3 },
  { url: `${frontendUrl}forgot-password`, priority: 0.2 },
];

export interface SitemapRoute {
  url: string;
  priority: number;
}

export default async function sitemap(): Promise<SitemapRoute[]> {
  let productRoutes: SitemapRoute[] = [];
  let collectionRoutes: SitemapRoute[] = [];

  try {
    // Fetch product slugs or handles
    const products = await sitemapService.getProductsSitemap();
    productRoutes = products.map((slug: string) => ({
      url: `${frontendUrl}products/${encodeURIComponent(slug)}`,
      priority: 0.8,
    }));

    // Fetch collection slugs or handles
    const collections = await sitemapService.getCollectionSitemap();
    collectionRoutes = collections.map((slug: string) => ({
      url: `${frontendUrl}collections/${encodeURIComponent(slug)}`,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
  }

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
