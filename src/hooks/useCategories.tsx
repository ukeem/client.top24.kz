"use client";

import { useInfiniteQuery } from "@tanstack/react-query";


const fetchCategories = async ({ pageParam = 1 }) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/cats?page=${pageParam}&limit=3`)
	return res.json()
}

export function useCategories() {


	return useInfiniteQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.nextPage : undefined,
	});
}