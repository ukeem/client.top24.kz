'use client'

import { use, useEffect, useRef } from 'react';
import { Category } from '@/types/category';
import { Post } from '@/types/post';
import MainPostItem from '../MainPostItem';
import s from './index.module.scss'
import Link from 'next/link';
import { transliterate } from 'transliteration';
import { useCategories } from '@/hooks/useCategories';
import Loader from '../Loader';

export default function MainPostList({
	posts
}: {
	posts: Post[]
}) {

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCategories();
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
		<>
			{data?.pages?.map((page) => (
				page?.categories?.map((category: Category) => { // ✅ Проверяем, что page и categories не undefined
					const categoryPosts = posts
						?.filter((post) => post.categoryId === category.id)
						?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
						?.slice(0, 3);

					return (
						<div key={category.id} className="mb-4">
							<Link
								href={`/${transliterate(category.name)
									.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
									.replace(/\s+/g, '-')
									.toLowerCase()}_${category.id}`}
								className={`${s.categoryName} mb-2 mb-md-3 d-block`}
							>
								<span>/// </span>{category.name}
							</Link>
							<div className={s.MainPostListItem}>
								{categoryPosts?.map((post) => (
									<MainPostItem key={post.id} post={post} />
								))}
							</div>
							<div className={s.googleAdsense}></div>
						</div>
					);
				})
			))}

			<div ref={observerRef} className="d-flex align-items-center justify-content-center">
				{isFetchingNextPage ? <p>Загрузка...</p> : null}
			</div>
		</>
	);

}
