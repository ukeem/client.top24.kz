/** @format */

import { Category } from "@/types/category";
import { Post } from "@/types/post";

export async function requestApi<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: Record<string, any>,
    queryParams?: Record<string, string>
): Promise<T> {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);

    // Добавление query-параметров, если они есть
    if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) =>
            url.searchParams.append(key, value)
        );
    }

    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url.toString(), options);

        if (!response.ok) {
            throw new Error(
                `Ошибка ${response.status}: ${response.statusText}`
            );
        }

        return response.json();
    } catch (error) {
        console.error("Ошибка запроса:", error);
        throw error;
    }
}

export async function getPostsByCategoryId(id: string): Promise<Post[]> {
    return requestApi<Post[]>(`/posts/category/${id}`, "GET");
}

export async function getPostById(id: string): Promise<Post> {
    return requestApi<Post>(`/posts/${id}`, "GET");
}

export async function getAllCategories(): Promise<Category[]> {
    return requestApi<Category[]>("/posts/category", "GET");
}

export async function getAllPosts(): Promise<Post[]> {
    return requestApi<Post[]>("/posts", "GET");
}

export async function getAsidePosts(): Promise<Post[]> {
    return requestApi<Post[]>("/posts/aside", "GET");
}

export async function getPostsByCategoryLimit(): Promise<Post[]> {
    return requestApi<Post[]>("/posts/limited", "GET");
}

export async function getCategories({
    pageParam,
}: {
    pageParam: number;
}): Promise<{ categories: Category[]; hasNextPage: boolean }> {
    return requestApi<{ categories: Category[]; hasNextPage: boolean }>(
        `/posts/cats?page=${pageParam}&limit=3`,
        "GET"
    );
}
