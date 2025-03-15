'use client'

import { Post } from '@/types/post';
import s from './index.module.scss'
import CategoryPostItem from '../CategoryPostItem';
import { useEffect, useRef } from 'react';
import { usePosts } from '@/hooks/usePosts';
import Loader from '../Loader';

export default function CategoryPostList({
	id
}: {
	id: number
}) {

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts(id);
	const observerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!hasNextPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) fetchNextPage();
			},
			{ rootMargin: "300px" }
		);

		if (observerRef.current) observer.observe(observerRef.current);

		return () => observer.disconnect();
	}, [hasNextPage, fetchNextPage]);


	if (!data) {
		return <Loader />
	}
	return (
		<div className={s.CategoryPostList} >
			{data?.pages?.map((page) => (
				page?.posts?.map((post: Post) => (
					<CategoryPostItem
						key={post.id}
						post={post}
					/>
				)))
			)}

			<div ref={observerRef} className="d-flex align-items-center justify-content-center">
				{isFetchingNextPage ? <p>Загрузка...</p> : null}
			</div>
		</div>
	);
}
