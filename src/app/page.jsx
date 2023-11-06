"use client";
import Carousel from '@/components/Carousel';
import Promotion from '@/components/Promotion';
import { useGetCategoriesQuery } from '@/redux/feature/category/categoryApiSlice';
import { selectAllProducts, useGetProductsQuery, useLazyGetProductsQuery } from '@/redux/feature/product/productApiSlice';
import { useSelector } from 'react-redux';

export default function Home(data) {

  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProductsQuery()
  const products = useSelector(selectAllProducts)

  let contentCarousels;
  if (isSuccess) {
    contentCarousels = (
      <>
        <Carousel title={'Ofertas'} products={products.slice(5, 9)} />
        <Carousel title={'Lo mas vendido'} products={products.slice(0, 4)} />
      </>
    )
  }

  return (
    <>
      <Promotion />
      {contentCarousels}
    </>
  )
}
