import { getAllCategories, getPostsByCategoryLimit } from '@/services/api';
import MainPostList from '@/ui/components/MainPostList';

export const revalidate = 3600

export default async function Home() {

	const posts = await getPostsByCategoryLimit()
	const categories = await getAllCategories()

	return (
		<>
			<h1 className='visually-hidden'>
				{categories.map(category => category.name).join(", ")}
			</h1>
			<MainPostList
				posts={posts}
			/>
		</>
	);
}
