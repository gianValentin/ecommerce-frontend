"use client";

import Galery from '@/components/pdp/Galery';
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/pdp/Breadcrumb';
import Price from '@/components/pdp/Price';
import Reviews from '@/components/pdp/Reviews';
import Count from '@/components/pdp/Count';
import Descriptions from '@/components/pdp/Descriptions';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSingleProductQuery } from '@/redux/feature/product/productApiSlice';
import { useAddToCartMutation } from '@/redux/feature/cart/cartApiSlice';
import { selectAmount, selectCart, setCart } from '@/redux/feature/cart/cartSlice';

export default function Pdp() {
  const params = useParams()
  const dispatch = useDispatch()

  const amount = useSelector(selectAmount)
  const cart = useSelector(selectCart)

  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSingleProductQuery(params.productId);
  const [addToCart, { isLoading: isLoadingCart }] = useAddToCartMutation()

  const onAddToCartClick = async (productCode) => {
    if (!productCode) console.error("Product code not Found");

    try {
      const res = await addToCart({ amount: amount, productCode: productCode, cartId: cart?.id }).unwrap()
      dispatch(setCart(res))
    } catch (error) {
      console.error("Error add to cart", error);
    }
  }

  let content;
  if (isLoading) {
    content = <p>Cargando...</p>
  } else if (isSuccess) {
    content = (
      <div className="bg-white">
        <div className="pt-6">

          {/* Breadcrumb */}
          <Breadcrumb product={product} />

          {/* Image gallery */}
          {product?.images && <Galery product={product} />}

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <Price product={product} />

              {/* Reviews */}
              <Reviews product={product} />

              <form className="mt-10">
                {/* Colors */}
                {/* <Colors product={product} /> */}

                {/* Sizes */}
                {/* <Sizes product={product} /> */}

                {/* Count */}
                <Count product={product} />

                <button
                  type="button"
                  className="
                    mt-10
                    flex w-full
                    items-center 
                    justify-center
                    rounded-md
                    border
                    border-transparent 
                    bg-indigo-600 
                    px-8 
                    py-3 
                    text-base 
                    font-medium 
                    text-white 
                    hover:bg-indigo-700 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-indigo-500 
                    focus:ring-offset-2"
                  /* onClick={e => onAddToCartClick(product.code)} */
                  onClick={e => onAddToCartClick(product.code)}
                >
                  Agregar
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <Descriptions product={product} />
            </div>
          </div>
        </div>
      </div>
    )
  } else if (isError) {
    content = <p>{error.error}</p>
  }

  return content
}
