import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/css/globals.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import { Providers } from './providers';
import Aside from '@/ui/components/Aside';
import { Suspense } from 'react';
import Loader from '@/ui/components/Loader';
import Nav from '@/ui/components/Nav';
import Header from '@/ui/components/Header';

const inter = Inter({
	subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
	title: 'TOP24.KZ - Самые популярные новости и статьи',
	description: "Top24.kz – свежие новости, аналитика и актуальные статьи. Будьте в курсе последних событий Казахстана и мира!",
	icons: {
		icon: [
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
			{ url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
		],
		apple: [
			{ url: '/apple-icon-57x57.png', sizes: '57x57' },
			{ url: '/apple-icon-60x60.png', sizes: '60x60' },
			{ url: '/apple-icon-72x72.png', sizes: '72x72' },
			{ url: '/apple-icon-76x76.png', sizes: '76x76' },
			{ url: '/apple-icon-114x114.png', sizes: '114x114' },
			{ url: '/apple-icon-120x120.png', sizes: '120x120' },
			{ url: '/apple-icon-144x144.png', sizes: '144x144' },
			{ url: '/apple-icon-152x152.png', sizes: '152x152' },
			{ url: '/apple-icon-180x180.png', sizes: '180x180' },
		],
		other: [
			{ rel: 'manifest', url: '/manifest.json' },
			{ rel: 'msapplication-TileImage', url: '/ms-icon-144x144.png' },
		],
	},
	applicationName: 'Название сайта',
	manifest: '/manifest.json',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {



	return (
		<html lang="ru">
			<body className={inter.className}>
				<Header />
				<Nav />
				<div className="container">
					<div className="row">
						<div className="col-12">
						</div>
						<div className="col-12 col-lg-9 mb-4 mb-lg-0">
							<Providers>
								<main>{children}</main>
							</Providers>
						</div>
						<div className="col-12 col-lg-3">
							<Aside />
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
