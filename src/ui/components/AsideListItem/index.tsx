import { Post } from '@/types/post'
import s from './index.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { transliterate } from 'transliteration'
import Script from 'next/script'

interface AsideListItemProps {
	post: Post
}

export default function AsideListItem({ post }: AsideListItemProps) {


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
		<div className={s.AsideListItemWrap}>
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
				className={`${s.AsideListItem} mb-4 d-block`}
			>
				<div className={`${s.image} mb-2`}>
					<Image
						src={`${process.env.NEXT_PUBLIC_IMAGE}/${post.image}`}
						alt={post.title}
						fill
						priority
						sizes="(max-width: 768px) 100vw, 318px"
						quality={75}
					/>
				</div>
				<h3>{post.title}</h3>
			</Link>
			<Link
				className={s.categoryLink}
				href={`/${transliterate(post.category.name)
					.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
					.replace(/\s+/g, '-')
					.toLowerCase()}_${post.category.id}`}
			>{post.category.name}</Link>
		</div>
	)
}
