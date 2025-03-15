import { Post } from '@/types/post'
import s from './index.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { transliterate } from 'transliteration'

interface AsideListItemProps {
	post: Post
}

export default function AsideListItem({ post }: AsideListItemProps) {
	return (
		<div className={s.AsideListItemWrap}>
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
