'use client';
import { ALL_CATEGORIES } from "@/constans/status";
import { useGetProductsQuery } from "@/redux/feature/product/productApiSlice";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const Product = () => {
    const params = useParams()

    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductsQuery(params.categoryId !== ALL_CATEGORIES && { categoryId: params.categoryId });

    let content;
    if (isLoading) {
        content = <p>Cargando...</p>
    } else if (isSuccess) {
        const { ids, entities } = products
        content = ids?.map((id) => (
            <Link href={`/pdp/${id}`} key={id}>
                <div className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <Image
                            src={entities[id].images[0].url}
                            alt={entities[id].images[0].name ?? 'product'}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <h3 className="text-sm text-gray-700">
                                <span aria-hidden="true" className="absolute inset-0" />
                                {entities[id].name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{entities[id].color ?? 'Negro'}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{`S/. ${entities[id].price.price}`}</p>
                    </div>
                </div>
            </Link>
        ))
    } else if (isError) {
        content = <p>{error.error}</p>
    }


    return (
        <div className="bg-white">
            <div className="max-w-2xl py-3 sm:py-6 lg:max-w-7xl">                
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Product;
