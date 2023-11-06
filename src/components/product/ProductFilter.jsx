"use client";
import { ALL_CATEGORIES } from '@/constans/status';
import { selectAllCategories, useGetCategoriesQuery } from '@/redux/feature/category/categoryApiSlice';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const ProductFilter = () => {
    const router = useRouter()
    const params = useParams()

    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoriesQuery()

    const categories = useSelector(selectAllCategories)

    const onCategoryClick = (categoryId) => {
        try {
            router.push(`/products/${categoryId}`)
        } catch (error) {
            console.error("Product Filter: ", error);
        }
    }

    let content;
    if (isLoading) {
        content = <p>Cargando...</p>
    } else if (isSuccess) {
        content = (
            <form className="hidden lg:block">
                <h3 className="sr-only">Categorias</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium">
                    <a onClick={e => onCategoryClick(ALL_CATEGORIES)} className={`cursor-pointer ${params.categoryId == ALL_CATEGORIES ? 'text-indigo-700' : 'text-gray-900'} hover:text-indigo-600`}>Todos</a>
                    {categories.map((category) => (
                        <li key={category.name} >
                            <a onClick={e => onCategoryClick(category.id)} className={`cursor-pointer ${params.categoryId == category.id ? 'text-indigo-700' : 'text-gray-900'} hover:text-indigo-600`}>{category.name}</a>
                        </li>
                    ))}
                </ul>
            </form>
        )
    } else if (isError) {
        content = <p>{error.error}</p>
    }

    return content;
}

export default ProductFilter