import { Post } from '@/types/post'
import s from './index.module.scss'
import Link from 'next/link'
import Views from '@/ui/icons/Views'
import { transliterate } from 'transliteration'
import Image from 'next/image'

interface CategoryPostItemProps {
	post: Post
}

export default function CategoryPostItem({ post }: CategoryPostItemProps) {
	return (
		<Link
			href={`/${transliterate(post.category.name)
				.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
				.replace(/\s+/g, '-')
				.toLowerCase()}_${post.categoryId}/${transliterate(post.title)
					.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
					.replace(/\s+/g, '-')
					.toLowerCase()}_${post.id}`}
			className={`${s.CategoryPostItem} p-3 d-flex align-items-end`}
		// style={{
		// 	background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%), 
		//  url("${process.env.NEXT_PUBLIC_IMAGE}/${post.image}") 
		//  center / cover no-repeat`
		// }}
		>
			<div className={s.overlay}></div>
			<Image
				src={`${process.env.NEXT_PUBLIC_IMAGE}/${post.image}`}
				alt={post.title}
				layout="fill"
				style={{ objectFit: "cover" }}
				priority
				quality={75}
			/>
			<article>
				<h3>{post.title}</h3>
				<div className={`${s.statistic} d-flex align-items-center`}>
					<div className=" d-flex align-items-center">
						<Views
							className={`${s.icon} me-1`}
						/>
						<span className={s.counter}>{post.viewed}</span>
					</div>
					{/* <div className=" d-flex align-items-center">
						<Views
							className={`${s.icon} me-1`}
						/>
						<span className={s.counter}>{post.views}</span>
					</div> */}
				</div>
			</article>
		</Link>
	)
}
