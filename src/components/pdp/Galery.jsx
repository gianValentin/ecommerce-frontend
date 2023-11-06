import Image from 'next/image';
import React from 'react'
/* import notFound from '../../../public/image-notfound.jpg' */

const Galery = ({ product }) => {

  let content;
  if (!product.images) {
    content = (
      <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block col-start-2">
        <Image
          src={''}
          alt={'notfound'}
          className="h-full w-full object-cover object-center"
          width={500}
          height={500}
        />
      </div>
    )
  } else if (product.images && product.images.lenght == 1) {
    content = (
      <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block col-start-2">
        <Image
          src={product.images[0].url}
          alt={product.images[0].name ?? 'product'}
          className="h-full w-full object-cover object-center"
          width={500}
          height={500}
        />
      </div>
    )
  } else {
    content = (
      <>
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          <Image
            src={product.images[0].url}
            alt={product.images[0].name ?? 'product'}
            className="h-full w-full object-cover object-center"
            width={500}
            height={500}
          />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <Image
              src={product.images[1].url}
              alt={product.images[1].name ?? 'product'}
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
            />
          </div>
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <Image
              src={product.images[2].url}
              alt={product.images[2].name ?? 'product'}
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <Image
            src={product.images[3].url}
            alt={product.images[3].name ?? 'product'}
            className="h-full w-full object-cover object-center"
            width={500}
            height={500}
          />
        </div>
      </>
    )
  }

  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3  lg:gap-x-8 lg:px-8">
      {content}
    </div>
  )
}

export default Galery