import { Post } from '@/types/post'
import s from './index.module.scss'
import AsideListItem from '../AsideListItem'

interface AsideListProps {
	posts: Post[]
}

export default function AsideList({ posts }: AsideListProps) {
	return (
		<>
			{posts.map(post => (
				<AsideListItem
					key={post.id}
					post={post}
				/>
			))}
		</>
	)
}
