
import { getAllCategories } from '@/services/api'
import NavWrap from '../NavWrap'

export default async function Nav() {
	const categories = await getAllCategories() // ✅ Асинхронный вызов только здесь
	return <NavWrap categories={categories} />
}
