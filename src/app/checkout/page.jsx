import PaymentDetails from "@/components/checkout/PaymentDetails"
import ShippingMethods from "@/components/checkout/ShippingMethods"
import OrderSummary from "@/components/checkout/OrderSummary"
import { useDispatch } from "react-redux"

function Checkout() {
    
    return (
        <>
            <div className="pt-8">
                <OrderSummary />
                <ShippingMethods />
            </div>

            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                <PaymentDetails />
            </div>
        </>
    )
}

export default Checkout