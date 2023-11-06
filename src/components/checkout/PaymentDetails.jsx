"use client";
import { removeCart, selectCart } from "@/redux/feature/cart/cartSlice";
import { usePlaceOrderMutation } from "@/redux/feature/order/orderApiSlice";
import { selectUserSession } from "@/redux/feature/user/userSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentDetails = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const errRef = useRef(null)
    const [errMsg, setErrMsg] = useState('')

    const [email, setEmail] = useState('')
    const [cardHolder, setCardHolder] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardDateExpiry, setCardDateExpiry] = useState('')
    const [cvc, setCVC] = useState('')
    const [billingStreet, setBillingStreet] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')

    const valid = [email, cardHolder, cardNumber, cardDateExpiry, cvc, billingStreet, state, zipCode].every(Boolean)

    const userSession = useSelector(selectUserSession)
    const cart = useSelector(selectCart)

    const [placeOrder] = usePlaceOrderMutation()

    useEffect(() => {
        setErrMsg('')
    }, [email, cardHolder, cardNumber, cardDateExpiry, cvc, state, zipCode])

    useEffect(() => {
        if (userSession) {
            setEmail(userSession.email)
            setCardHolder(userSession.firstname + ' ' + userSession.lastname)
            setCardNumber('2222-2222-2222-2222')
            setCardDateExpiry('01/26')
            setCVC('123')
            setBillingStreet('av. Javier Prado 123')
            setState('Arequipa')
            setZipCode('110404')
        }
    }, [userSession])


    const onPlaceorderSubmit = async (e) => {
        e.preventDefault()

        if (!valid) {
            return;
        }

        try {
            const resOrder = await placeOrder().unwrap()
            
            router.push(`/orders/${resOrder?.id}`)

            dispatch(removeCart())                        
        } catch (err) {
            console.error("Place Order: ", err);
            if (!err?.status) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Credenciales incorrectas');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus();
        }        
    }

    const handleEmailInput = (e) => setEmail(e.target.value)
    const handleCardHolderInput = (e) => setCardHolder(e.target.value)
    const handleCardNumberInput = (e) => setCardNumber(e.target.value)
    const handleCardDateExpiryInput = (e) => setCardDateExpiry(e.target.value)
    const handleCVCInput = (e) => setCVC(e.target.value)
    const handleBillingStreetInput = (e) => setBillingStreet(e.target.value)
    const handleStateInput = (e) => setState(e.target.value)
    const handleZipCodeInput = (e) => setZipCode(e.target.value)

    return (
        <>
            <p className="text-xl font-medium">Detalles de pago</p>
            <p className="text-gray-400">Complete su pedido proporcionando sus datos de pago.</p>
            <p className="text-sm text-yellow-500">Puedes completar el formulario con cualquier dato de prueba, no es requerido ningun dato valido para esta Demo.</p>
            <form className="" onSubmit={onPlaceorderSubmit}>
                <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
                <div className="relative">
                    <input
                        value={email}
                        onChange={handleEmailInput}
                        required
                        type="email"
                        id="email"
                        name="email"
                        className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="your.email@gmail.com" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>
                </div>
                <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Titular de la tarjeta</label>
                <div className="relative">
                    <input
                        value={cardHolder}
                        onChange={handleCardHolderInput}
                        required
                        type="text"
                        id="card-holder"
                        name="card-holder"
                        className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="nombres" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                        </svg>
                    </div>
                </div>
                <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">Detalles de tarjeta</label>
                <div className="flex">
                    <div className="relative w-7/12 flex-shrink-0">
                        <input
                            value={cardNumber}
                            onChange={handleCardNumberInput}
                            required
                            type="text"
                            id="card-no"
                            name="card-no"
                            className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="xxxx-xxxx-xxxx-xxxx" />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                            </svg>
                        </div>
                    </div>
                    <input
                        value={cardDateExpiry}
                        onChange={handleCardDateExpiryInput}
                        required
                        type="text"
                        name="credit-expiry"
                        className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="MM/YY" />
                    <input
                        value={cvc}
                        onChange={handleCVCInput}
                        required
                        type="text"
                        name="credit-cvc"
                        className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="CVC" />
                </div>
                <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Dirección de Envio</label>
                <div className="flex flex-col sm:flex-row">
                    <div className="relative flex-shrink-0 sm:w-7/12">
                        <input
                            value={billingStreet}
                            onChange={handleBillingStreetInput}
                            required
                            type="text"
                            id="billing-address"
                            name="billing-address"
                            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Dirección" />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <Image
                                className="h-4 w-4 object-contain"
                                src="https://flagpack.xyz/_nuxt/b15bfeb63d8381b63973169f3dbaffc3.svg"
                                alt=""
                                width={100}
                                height={100} />
                        </div>
                    </div>
                    <select
                        value={state}
                        onChange={handleStateInput}
                        type="text"
                        name="billing-state"
                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                        <option value="Lima">Lima</option>
                        <option value="Arequipa">Arequipa</option>
                        <option value="La Libertad">La Libertad</option>
                    </select>
                    <input
                        value={zipCode}
                        onChange={handleZipCodeInput}
                        required
                        type="text"
                        name="billing-zip"
                        className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Cod. Postal" />
                </div>

                <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Subtotal</p>
                        <p className="font-semibold text-gray-900">{`S/. ${cart?.subTotal ?? '00.00'}`}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Envío</p>
                        <p className="font-semibold text-gray-900">{cart?.delivery ? `S/. ${cart?.delivery}` : 'Gratis'}</p>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">{`S/. ${cart?.total ?? '00.00'}`}</p>
                </div>
                <p ref={errRef} className={errMsg ? "text-center text-red-500 errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <button className="mt-4 mb-8 w-full rounded-md bg-indigo-600 hover:bg-indigo-700 px-6 py-3 font-medium text-white">Realizar Pedido</button>
            </form>
        </>
    )
}

export default PaymentDetails