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
};

export default nextConfig;
