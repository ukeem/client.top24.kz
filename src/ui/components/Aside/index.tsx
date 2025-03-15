import { Post } from '@/types/post'
import s from './index.module.scss'
import Link from 'next/link'
import Views from '@/ui/icons/Views'
import { transliterate } from 'transliteration'
import { getAsidePosts } from '@/services/api'
import AsideList from '../AsideList'

// interface AsideProps {
// 	posts: Post[]
// }

export default async function Aside() {

	const posts = await getAsidePosts()
	return (
		<aside>
			<div className={s.asideWrap}>
				<h4>Популярное</h4>
				<AsideList posts={posts} />
			</div>
		</aside>
	)
}
