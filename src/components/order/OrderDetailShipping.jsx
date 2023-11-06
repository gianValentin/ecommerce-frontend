import Image from 'next/image'
import React from 'react'

const OrderDetailShipping = () => {
    return (
        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">Metodo de envío</h3>        
            <div className="">                    
                    <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                        <Image
                            className="w-14 object-contain"
                            src="/shipping-and-delivery.png"
                            alt=""
                            width={200}
                            height={200}
                        />
                        <div className="ml-5">
                            <span className="mt-2 font-semibold">Serpost Delivery</span>
                            <p className="text-slate-500 text-sm leading-6">Entrega: 2-4 Días</p>
                        </div>
                    </label>
                </div>
        </div>
    )
}

export default OrderDetailShipping