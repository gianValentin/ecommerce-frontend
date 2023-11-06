import Image from 'next/image'
import React from 'react'

const ShippingMethods = () => {
    return (
        <>
            <p className="mt-8 text-lg font-medium">Metodos de envío</p>
            <form className="mt-5 grid gap-6">
                <div className="relative">
                    <input className="peer hidden" id="radio_1" type="radio" name="radio" />
                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
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
                {/* <div className="relative">
                    <input className="peer hidden" id="radio_2" type="radio" name="radio" />
                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                        <Image
                            className="w-14 object-contain"
                            src="/logo.png"
                            alt=""
                            width={200}
                            height={200}
                        />
                        <div className="ml-5">
                            <span className="mt-2 font-semibold">Fedex Delivery</span>
                            <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                        </div>
                    </label>
                </div> */}
            </form>
        </>
    )
}

export default ShippingMethods