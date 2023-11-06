"use client";
import { selectCart } from "@/redux/feature/cart/cartSlice";
import Image from "next/image";
import { useSelector } from "react-redux";

const OrderSummary = () => {
    const cart = useSelector(selectCart)

    const entries = cart?.entries.map(entry => (
        <div key={entry.id} className="flex flex-col rounded-lg bg-white sm:flex-row">
            <Image
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src={entry.product?.images[0]?.url ?? ''}
                alt={entry.product?.images[0]?.name ?? 'product'}
                width={500}
                height={500}
            />
            <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{entry.product.name}</span>
                <span className="float-right text-gray-400">42EU - 8.5US</span>
                <p className="text-lg font-bold">{`S/. ${entry?.total ?? '00.00'}`}</p>
            </div>
        </div>
    ))

    return (
        <>
            <p className="text-xl font-medium">Resumen del pedido</p>
            <p className="text-gray-400">revisa tus artículos y seleccione un método de envío adecuado.</p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                {entries}
            </div>
        </>
    )
}

export default OrderSummary