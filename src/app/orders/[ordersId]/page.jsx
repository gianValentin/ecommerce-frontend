"use client";
import OrderDetailEntries from '@/components/order/OrderDetailEntries';
import OrderDetailShipping from '@/components/order/OrderDetailShipping';
import OrderDetailSummary from '@/components/order/OrderDetailSummary';
import { useGetSingleOrderQuery } from '@/redux/feature/order/orderApiSlice';
import { useParams } from 'next/navigation';

function OrderPage() {
    const params = useParams()
    const {
        data: order,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSingleOrderQuery(params.ordersId);

    let content;
    if (isLoading) {
        content = <p>Cargando...</p>
    } else if (isSuccess) {
        content = (
            <>
                <div className="flex justify-start item-start space-y-2 flex-col pt-8">
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order #<span className='text-indigo-600'>{order.id.substring(0, 8)}</span></h1>
                    <p className="text-base font-medium leading-6 text-gray-600">Fecha de pedido: {order?.createAt && new Date(order.createAt).toLocaleDateString()}</p>
                </div>
                <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        {/* List Entries */}
                        <OrderDetailEntries order={order} />
                        <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            {/* Summary */}
                            <OrderDetailSummary order={order}/>
                            {/* Shipping Delivery */}
                            <OrderDetailShipping />
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (isError) {
        content = <p>{error.error}</p>
    }

    return content;
}

export default OrderPage