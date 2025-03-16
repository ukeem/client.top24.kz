import { getAllCategories, getPostsByCategoryId } from '@/services/api';
import CategoryPostList from '@/ui/components/CategoryPostList';
import { Metadata } from 'next';
import { transliterate } from 'transliteration';

export const revalidate = 3600

// export const dynamicParams = false

export async function generateStaticParams() {
	const categories = await getAllCategories()

	return categories.map((category) => ({
		category: `${transliterate(category.name)
			.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
			.replace(/\s+/g, '-')
			.toLowerCase()}_${category.id}`,
	}))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {

	const { category } = await params
	const id = category.split("_")[1]
	const posts = await getPostsByCategoryId(id);

	if (!posts.length) return {};

	const categoryName = posts[0].category.name;
	const firstPost = posts[0];
	const url = `/${category}`;

	return {
		metadataBase: new URL("https://top24.kz"),
		title: `${categoryName} - Новости и статьи`,
		description: `Читайте последние новости и статьи из категории "${categoryName}".`,
		keywords: [`${categoryName}`, 'новости', 'статьи', 'блог', 'тренды'],
		robots: 'index, follow', // Разрешает индексацию и следование по ссылкам
		alternates: {
			canonical: url, // Канонический URL страницы
		},
		openGraph: {
			type: 'website',
			url,
			title: `${categoryName} - Новости и статьи`,
			description: `Читайте последние новости и статьи из категории "${categoryName}".`,
			images: firstPost?.image ? [{ url: firstPost.image, width: 1200, height: 630 }] : [],
			siteName: 'TOP24.KZ',
			locale: 'ru_RU',
		},
		twitter: {
			card: 'summary_large_image',
			title: `${categoryName} - Новости и статьи`,
			description: `Читайте последние новости и статьи из категории "${categoryName}".`,
			images: firstPost?.image ? [firstPost.image] : [],
		},
		other: {
			'og:type': 'website',
			'og:site_name': 'TOP24.KZ',
			'og:locale': 'ru_RU',
		},
	};
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {

	const { category } = await params
	const id = category.split("_")[1]
	const posts = await getPostsByCategoryId(id);
	const categoryName = posts[0].category.name

	return (
		<>
			<h1 className="categoryTitle mb-2 mb-md-3"><span>/// </span>{categoryName}</h1>
			<CategoryPostList
				id={+id}
			/>
		</>
	);
}
