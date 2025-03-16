/** @format */

import type { MetadataRoute } from "next";
import { getAllCategories, getAllPosts } from "@/services/api";
import { transliterate } from "transliteration";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE || "https://top24.kz";

    // Получаем все категории и посты из API
    const categories = await getAllCategories();
    const posts = await getAllPosts();
    console.log(posts.length);

    const categoryUrls = categories.map((category) => ({
        url: `${siteUrl}/${transliterate(category.name)
            .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase()}_${category.id}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily" as const,
        priority: 0.8,
    }));

    // Генерируем URL для постов
    const postUrls = posts.map((post) => ({
        url: `${siteUrl}/${transliterate(post.category.name)
            .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase()}_${post.categoryId}/${transliterate(post.title)
            .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase()}_${post.id}`,
        lastModified: post.createdAt || new Date().toISOString(),
        changeFrequency: "daily" as const,
        priority: 0.9,
        images: [`${post.image}`],
    }));

    return [
        {
            url: siteUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 1,
        },
        ...postUrls,
        ...categoryUrls,
    ];
}
