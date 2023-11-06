"use client"
import { selectAllOrders, useGetOrdersQuery } from '@/redux/feature/order/orderApiSlice';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const OrdersList = () => {

    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetOrdersQuery()

    const orders = useSelector(selectAllOrders)

    let listContent;
    if (isLoading) {
        listContent = <p>Cargando...</p>
    } else if (isSuccess) {
        listContent = orders.map((order) => (
            <div key={order.id} className="flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">Código de orden: <span className='text-indigo-600'>{order.id.substring(0, 8)}</span></h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-sm leading-none text-gray-800"><span className=" text-gray-300">Tipo de envío: </span> Serpost Delivery</p>
                            <p className="text-sm leading-none text-gray-800"><span className=" text-gray-300">Fecha de pedido: </span>{order?.createAt && new Date(order.createAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base xl:text-lg leading-6">{`S/. ${order.subTotal}`}</p>
                        <p className="text-base xl:text-lg leading-6 text-gray-800">{order?.entries ? order?.entries.length : 0}</p>
                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">{`S/. ${order.total}`}</p>
                        <Link href={`/orders/${order.id}`} className="text-base xl:text-lg font-semibold leading-6 text-indigo-600">Detalle</Link>
                    </div>
                </div>
            </div>
        ))
    } else if (isError) {
        listContent = <p>{error.error}</p>
    }

    return (
        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            {listContent}
        </div>
    )
}

export default OrdersList