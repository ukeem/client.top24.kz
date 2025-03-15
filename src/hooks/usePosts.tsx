"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPosts = async ({ pageParam = 1, queryKey }: { pageParam?: number; queryKey: (string | number)[] }) => {
	const [, id] = queryKey as [string, string | number]; // ✅ Достаем id из queryKey
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/posts/ltd?page=${pageParam}&limit=10&id=${id}`
	);
	return res.json();
};

export function usePosts(id: string | number) {
	return useInfiniteQuery({
		queryKey: ["posts", id], // ✅ id добавлен в queryKey
		queryFn: fetchPosts,
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.hasNextPage ? lastPage.nextPage : undefined,
		enabled: !!id, // ✅ Запрос выполняется только если id определен
	});
}
