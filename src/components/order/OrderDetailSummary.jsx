import React from 'react'

const OrderDetailSummary = ({order}) => {
    return (
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">Resumen</h3>
            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                    <p className="text-base leading-4 text-gray-600">{`S/. ${order.subTotal}`}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">Descuento {/* <span className="bg-gray-200 p-1 text-xs font-medium leading-3 text-gray-800">STUDENT</span> */}</p>
                    <p className="text-base leading-4 text-gray-600">{`S/. 0.0`}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">Envío</p>
                    <p className="text-base leading-4 text-gray-600">Gratis</p>
                </div>
            </div>
            <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                <p className="text-base font-semibold leading-4 text-gray-600">{`S/. ${order.total}`}</p>
            </div>
        </div>
    )
}

export default OrderDetailSummary