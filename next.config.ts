/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "top24.kz",
                // port: "8080",
                pathname: "/images/**",
                search: "",
            },
        ],
    },
    // output: "export",\
    env: {
        NEXT_PUBLIC_API_URL: "https://top24.kz/api",
        NEXT_PUBLIC_IMAGE: "https://top24.kz/images",
        NEXT_PUBLIC_SITE: "https://top24.kz",
    },
};

export default nextConfig;
