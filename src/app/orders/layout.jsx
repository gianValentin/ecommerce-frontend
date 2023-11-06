"use client";

import { OPEN_LOGIN, OPEN_REGISTER } from "@/constans/status";
import { setModalAuthStatus } from "@/redux/feature/auth/authSlice";
import { selectCart } from "@/redux/feature/cart/cartSlice";
import { selectAllOrders, useGetOrdersQuery } from "@/redux/feature/order/orderApiSlice";
import { selectUserSession } from "@/redux/feature/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Layout({ children }) {
    const dispatch = useDispatch()
    const userSession = useSelector(selectUserSession)
    const cart = useSelector(selectCart)    

    let content;
    if (!userSession) {
        content = (
            <div className='bg-white'>
                <div className="mx-auto max-w-2xl py-3 sm:py-6 lg:max-w-7xl grid lg:grid-cols-2">
                    <div className="pt-8">
                        <p className="text-xl font-medium">Inicia session para realizar el checkout</p>
                        <p className="text-gray-400">
                            {'Puedes '}
                            <a onClick={e => dispatch(setModalAuthStatus(OPEN_LOGIN))} className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                {'Iniciar Sesión'}
                            </a>
                            {' o '}
                            <a onClick={e => dispatch(setModalAuthStatus(OPEN_REGISTER))} className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                {'Registrarte'}
                            </a>
                            {' desde aquí.'}
                        </p>
                    </div>
                </div>
            </div >)
    } else {
        content = (
            <div className='bg-white'>
                <div className='mx-auto max-w-2xl py-3 sm:py-6 lg:max-w-7xl'>
                    {children}
                </div>
            </div>)
    }

    return content
}