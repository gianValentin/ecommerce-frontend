'use client';

import { ALL_CATEGORIES } from '@/constans/status';
import { selectAllCategories, useGetCategoriesQuery } from '@/redux/feature/category/categoryApiSlice';
import { buildCategoryTree } from '@/utils/categoryTree';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';

function CategoryItems({ categories, selectedCategoryId, onCategoryClick }) {
    return categories.map((category) => {
        const isSelected = String(selectedCategoryId) === String(category.id);

        return (
            <li key={category.id}>
                <button
                    type="button"
                    aria-current={isSelected ? 'page' : undefined}
                    onClick={() => onCategoryClick(category.id)}
                    className={`w-full rounded px-2 py-2 text-left hover:text-indigo-600 ${
                        isSelected ? 'font-semibold text-indigo-700' : 'text-gray-700'
                    }`}
                >
                    {category.name}
                </button>
                {category.children.length > 0 && (
                    <ul className="ml-3 border-l border-gray-200 pl-2">
                        <CategoryItems
                            categories={category.children}
                            selectedCategoryId={selectedCategoryId}
                            onCategoryClick={onCategoryClick}
                        />
                    </ul>
                )}
            </li>
        );
    });
}

export default function CategoryNavigation({ onCategorySelect, mobile = false }) {
    const router = useRouter();
    const params = useParams();
    const { isLoading, isError, error } = useGetCategoriesQuery();
    const categories = useSelector(selectAllCategories);
    const categoryTree = useMemo(() => buildCategoryTree(categories), [categories]);

    const onCategoryClick = (categoryId) => {
        router.push(`/products/${categoryId}`);
        onCategorySelect?.();
    };

    if (isLoading) return <p className="px-2 py-3 text-sm text-gray-500">Cargando categorías...</p>;
    if (isError) {
        return <p className="px-2 py-3 text-sm text-red-600">{error?.data?.message ?? error?.error ?? 'No se pudieron cargar las categorías.'}</p>;
    }

    const allCategoriesSelected = params.categoryId === ALL_CATEGORIES;

    return (
        <nav aria-label="Categorías">
            <h3 className={`px-2 pb-2 font-semibold text-gray-900 ${mobile ? 'text-base' : 'text-sm'}`}>
                Categorías
            </h3>
            <ul className={`space-y-1 ${mobile ? 'px-2 pb-4' : 'border-b border-gray-200 pb-6 text-sm'}`}>
                <li>
                    <button
                        type="button"
                        aria-current={allCategoriesSelected ? 'page' : undefined}
                        onClick={() => onCategoryClick(ALL_CATEGORIES)}
                        className={`w-full rounded px-2 py-2 text-left hover:text-indigo-600 ${
                            allCategoriesSelected ? 'font-semibold text-indigo-700' : 'text-gray-700'
                        }`}
                    >
                        Todas las categorías
                    </button>
                </li>
                <CategoryItems
                    categories={categoryTree}
                    selectedCategoryId={params.categoryId}
                    onCategoryClick={onCategoryClick}
                />
            </ul>
        </nav>
    );
}
