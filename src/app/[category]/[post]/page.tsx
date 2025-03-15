import { getAllPosts, getPostById } from '@/services/api';
import PostPage from '@/ui/components/PostPage';
import { Metadata } from 'next';
import Script from 'next/script';
import { transliterate } from 'transliteration';

export const revalidate = 3600
export const dynamicParams = false

export async function generateStaticParams() {
	const posts = await getAllPosts()

	return posts.map((post) => ({
		post: `${transliterate(post.title)
			.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
			.replace(/\s+/g, '-')
			.toLowerCase()}_${post.id}`,
	}))
}

export async function generateMetadata({ params }: { params: Promise<{ post: string }> }): Promise<Metadata> {
	const { post } = await params
	const id = post.split("_")[1]
	const fullPost = await getPostById(id);
	const postUrl = `${process.env.NEXT_PUBLIC_SITE}/${transliterate(fullPost.category.name)
		.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
		.replace(/\s+/g, '-')
		.toLowerCase()}_${fullPost.categoryId}/${transliterate(fullPost.title)
			.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
			.replace(/\s+/g, '-')
			.toLowerCase()}_${fullPost.id}`

	const imageUrl = fullPost.image

	return {
		metadataBase: new URL("https://top24.kz"),
		title: fullPost.title, // Заголовок страницы
		description: fullPost.content.slice(0, 170) || `Читай пост: ${fullPost.title}`, // Описание
		keywords: fullPost.title || 'новости, статьи, блог, контент', // Ключевые слова
		robots: 'index, follow', // Разрешение индексации
		alternates: {
			canonical: postUrl,
		},
		openGraph: {
			type: 'article',
			url: postUrl,
			title: fullPost.title,
			description: fullPost.content.slice(0, 170) || `Читай пост: ${fullPost.title}`,
			images: [
				{
					url: imageUrl,
					alt: fullPost.title,
				},
			],
			siteName: 'TOP24.KZ',
			locale: 'ru_RU',
			publishedTime: fullPost.createdAt,
			modifiedTime: fullPost.createdAt,
			authors: process.env.NEXT_PUBLIC_SITE,
		},
		twitter: {
			card: 'summary_large_image',
			title: fullPost.title,
			description: fullPost.content.slice(0, 170) || `Читай пост: ${fullPost.title}`,
			images: [imageUrl],
		},
		other: {
			'og:type': 'website',
			'og:site_name': 'TOP24.KZ',
			'og:locale': 'ru_RU',
		},
	};
}

export default async function CategoryPage({ params }: { params: Promise<{ post: string }> }) {

	const { post } = await params
	const id = post.split("_")[1]
	const fullPost = await getPostById(id);

	const postUrl = `${process.env.NEXT_PUBLIC_SITE}/${transliterate(fullPost.category.name)
		.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
		.replace(/\s+/g, '-')
		.toLowerCase()}_${fullPost.categoryId}/${transliterate(fullPost.title)
			.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
			.replace(/\s+/g, '-')
			.toLowerCase()}_${fullPost.id}`

	const logo = '/logo.png'

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: fullPost.title,
		image: fullPost.image,
		datePublished: fullPost.createdAt,
		dateModified: fullPost.createdAt,
		author: {
			'@type': 'Organization',
			name: 'TOP24.KZ'
		},
		publisher: {
			'@type': 'Organization',
			name: 'TOP24.KZ',
			logo: {
				'@type': 'ImageObject',
				url: logo
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': postUrl
		}
	};

	return (
		<>
			<Script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<PostPage post={fullPost} />
		</>
	);
}
