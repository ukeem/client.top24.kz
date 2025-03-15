'use client'

import { Post } from '@/types/post'
import s from './index.module.scss'
import Image from 'next/image'
import MarkdownRenderer from '../MarkdownRenderer'
import Loader from '../Loader'
import { useEffect, useState } from 'react'

export default function PostPage({
	post
}: {
	post: Post
}) {

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(false)
	}, [])


	if (loading) {
		return <Loader />
	}

	return (
		<div className={`${s.PostPage}`}>
			<h2 className={`${s.title}  mb-2 mb-md-3`}><span>/// </span>{post.title}</h2>
			<div className={`${s.googleAdsense} mb-4`}></div>
			<div className={`${s.image} mb-4`}>
				<Image
					src={`${process.env.NEXT_PUBLIC_IMAGE}/images/${post.image}`}
					alt={post.title}
					fill
					priority
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					quality={75}
				/>
			</div>
			<div className="">
				<MarkdownRenderer content={post.content} />
			</div>
		</div>
	)
}
