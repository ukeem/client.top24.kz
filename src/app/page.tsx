import { getPostsByCategoryLimit } from '@/services/api';
import MainPostList from '@/ui/components/MainPostList';

export default async function Home() {

	const posts = await getPostsByCategoryLimit()
	console.log("📌 Загруженные посты:", posts);

	return (
		<>
			<MainPostList
				posts={posts}
			/>
		</>
	);
}
