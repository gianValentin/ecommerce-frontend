import Image from 'next/image'
import React from 'react'

const OrderDetailEntries = ({ order }) => {
    const listEntries = order.entries.map(entry => (
        <div key={entry.id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
            <div className="pb-4 md:pb-8 w-full md:w-40">
                <Image
                    className="w-full hidden md:block"
                    src={entry.product?.images[0]?.url ?? ''}
                    alt={entry.product?.images[0]?.name ?? 'product'}
                    width={500}
                    height={500} />
                <Image
                    src={entry.product?.images[0]?.url ?? ''}
                    alt={entry.product?.images[0]?.name ?? 'product'}
                    className="w-full md:hidden"
                    width={500}
                    height={500} />
            </div>
            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{entry?.product?.name}</h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                        {/* <p className="text-sm leading-none text-gray-800"><span className=" text-gray-300">Style: </span> Italic Minimal Design</p>
                        <p className="text-sm leading-none text-gray-800"><span className=" text-gray-300">Size: </span> Small</p>
                        <p className="text-sm leading-none text-gray-800"><span className=" text-gray-300">Color: </span> Light Blue</p> */}
                    </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base xl:text-lg leading-6">{`S/. ${entry?.product?.price?.price}`} </p>
                    <p className="text-base xl:text-lg leading-6 text-gray-800">{entry?.amount}</p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">{`S/. ${entry.total}`}</p>
                </div>
            </div>
        </div>
    ))

    return (
        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Productos</p>
            {listEntries}
        </div>
    )
}

export default OrderDetailEntries