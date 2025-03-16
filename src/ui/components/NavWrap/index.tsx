'use client'
import s from './index.module.scss'
import Link from 'next/link'
import { transliterate } from 'transliteration'
import { usePathname } from 'next/navigation'
import { Category } from '@/types/category'
import HomeIcon from '@/ui/icons/HomeIcon'

interface NavProps {
	categories: Category[]
}

export default function NavWrap({ categories }: NavProps) {
	const pathname = usePathname() // ✅ Получаем текущий путь


	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
	}

	const sortedCategories = categories.slice().sort((a, b) => a.name.localeCompare(b.name))

	return (
		<nav className={`${s.Nav} mb-4`}>
			<div className="container">
				<div className={`${s.NavWrap} d-flex`}>
					<Link
						href="/"
						className={`${s.mainLink} ${pathname === '/' ? s.active : ''} d-flex align-items-center`}
						onClick={handleClick}
					>
						<HomeIcon /> Главная
					</Link>
					{sortedCategories.map(category => {
						const categoryPath = `/${transliterate(category.name)
							.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
							.replace(/\s+/g, '-')
							.toLowerCase()}_${category.id}`

						const isActive = pathname === categoryPath

						return (
							<Link
								key={category.id}
								href={categoryPath}
								className={isActive ? s.active : ''}
								onClick={handleClick}
							>
								{category.name}
							</Link>
						)
					})}
				</div>
			</div>
		</nav>
	)
}
