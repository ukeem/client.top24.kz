import { Post } from '@/types/post'
import s from './index.module.scss'
import Link from 'next/link'
import Views from '@/ui/icons/Views'
import { transliterate } from 'transliteration'
import Image from 'next/image'
import Script from 'next/script'

interface MainPostItemProps {
	post: Post
}

export default function MainPostItem({ post }: MainPostItemProps) {

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		"headline": `${post.title}`,
		"author": {
			"@type": "Person",
			"name": "TOP24.KZ"
		},
		"publisher": {
			"@type": "Organization",
			"name": "TOP24.KZ",
			"logo": {
				"@type": "ImageObject",
				"url": `${process.env.NEXT_PUBLIC_IMAGE}/${post.image}`
			}
		},
		"datePublished": `${post.createdAt}`,
		"dateModified": `${post.createdAt}`
	}

	return (
		<>
			<Script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Link
				href={`/${transliterate(post.category.name)
					.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
					.replace(/\s+/g, '-')
					.toLowerCase()}_${post.categoryId}/${transliterate(post.title)
						.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
						.replace(/\s+/g, '-')
						.toLowerCase()}_${post.id}`}
				className={`${s.MainPostItem} p-3 d-flex align-items-end`}
			// style={{
			// 	background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%), 
			//      url("${process.env.NEXT_PUBLIC_IMAGE}/${post.image}") 
			//      center / cover no-repeat`
			// }}

			>
				<div className={s.overlay}></div>
				<Image
					src={`${process.env.NEXT_PUBLIC_IMAGE}/${post.image}`}
					alt={post.title}
					fill
					style={{ objectFit: "cover" }}
					priority
					sizes="100vw"
					quality={50}
				/>
				<article className="">
					<h3 className={`nowrapText`}>{post.title}</h3>
					<div className={`${s.statistic} d-flex align-items-center`}>
						<div className=" d-flex align-items-center">
							<Views
								className={`${s.icon} me-2`}
							/>
							<span className={s.counter}>{post.viewed}</span>
						</div>
					</div>
				</article>
			</Link>
		</>
	)
}
