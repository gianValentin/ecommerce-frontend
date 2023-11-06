import Image from "next/image"
import Link from "next/link";

export default function Carousel({ products, title }) {
  console.log(products);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:pt-8 lg:max-w-7xl lg:px-8">
        <h3 className="text-xl text-gray-500 mb-7">{title}</h3>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product.id} href={`/pdp/${product.id}`} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                  src={product?.images[0]?.url}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                  width={500}
                  height={500}
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{`S/. ${product.price?.price}`}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
