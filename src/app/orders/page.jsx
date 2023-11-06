import OrdersList from '@/components/order/OrdersList'

const Orders = () => {
  
  return (
    <>
      <div className="flex justify-start item-start space-y-2 flex-col pt-8">
        <p className="text-xl font-medium">Mis pedidos</p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <OrdersList/>
        </div>
      </div>
    </>
  )
}

export default Orders