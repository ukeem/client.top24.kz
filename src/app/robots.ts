/** @format */

import { MetadataRoute } from "next";

// export const revalidate = 3600;
// export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    const siteUrl = process.env.NEXT_PUBLIC_SITE || "https://top24.kz";

    if (!process.env.NEXT_PUBLIC_SITE) {
        console.warn(
            "NEXT_PUBLIC_SITE не задан, используется значение по умолчанию."
        );
    }

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: "/images",
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
        host: siteUrl,
    };
}
