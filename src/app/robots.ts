/** @format */

import { MetadataRoute } from "next";

export const revalidate = 3600;
// export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${
            process.env.NEXT_PUBLIC_SITE || "https://top24.kz"
        }/sitemap.xml`,
    };
}
