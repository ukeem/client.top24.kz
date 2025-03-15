
import s from './index.module.scss'
import Link from 'next/link';

export default function Header() {

	return (
		<header className={s.header}>
			<div className="container">
				<div className="">
					<Link
						href='/'
						className={s.logo}
					>
						<span>TOP</span>
						<span>24</span>
						<span> Kazakhstan</span>
					</Link>
				</div>
			</div>
		</header>
	)
}
