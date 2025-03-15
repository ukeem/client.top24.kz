import { getPostsByCategoryLimit } from '@/services/api';
import MainPostList from '@/ui/components/MainPostList';

export default async function Home() {

	const posts = await getPostsByCategoryLimit()

	return (
		<>
			<MainPostList
				posts={posts}
			/>
		</>
	);
}
