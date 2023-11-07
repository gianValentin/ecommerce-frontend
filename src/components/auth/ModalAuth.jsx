'use client';

import { useEffect, useRef, useState } from "react";
import Layout from "./Layout";
import { useLoginMutation, useRegisterMutation } from "@/redux/feature/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectModalAuthStatus, setCredentials, setModalAuthStatus } from "@/redux/feature/auth/authSlice";
import { selectCart, setCart } from "@/redux/feature/cart/cartSlice";
import { useLazyGetSingleCartQuery } from "@/redux/feature/cart/cartApiSlice";
import { Dialog } from "@headlessui/react";
import { OPEN_LOGIN, OPEN_REGISTER, SUCCESS_AUTH } from "@/constans/status";
import { useLazyGetSessionUserQuery } from "@/redux/feature/user/userApiSlice";
import { setUserSession } from "@/redux/feature/user/userSlice";


export default function ModalAuth() {
    const [type, setType] = useState('')
    const usernameRef = useRef(null)
    const errRef = useRef(null)
    const [firstname, setfirstname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const cart = useSelector(selectCart)    
    const modalAuthStatus = useSelector(selectModalAuthStatus)


    const dispatch = useDispatch()

    const [login] = useLoginMutation()
    const [register] = useRegisterMutation()
    const [triggerGetSingelCart] = useLazyGetSingleCartQuery()
    const [triggerGetSessionUser] = useLazyGetSessionUserQuery()

    useEffect(() => {
        if (modalAuthStatus === OPEN_LOGIN || modalAuthStatus === OPEN_REGISTER) {
            setType(modalAuthStatus)
        }
    }, [modalAuthStatus])

    useEffect(() => {
        usernameRef.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password, firstname, lastname, email])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let resAuth;
            if (type === OPEN_LOGIN) {
                resAuth = await login({ username, password }).unwrap()
            } else if (type === OPEN_REGISTER) {
                resAuth = await register({ username, password, firstname, lastname, email }).unwrap()
            }

            dispatch(setCredentials({ ...resAuth }))

            const resGetSimgleCart = await triggerGetSingelCart(cart?.id).unwrap()
            dispatch(setCart(resGetSimgleCart))

            const resGetSessionUser = await triggerGetSessionUser().unwrap()
            dispatch(setUserSession(resGetSessionUser))

            setUsername('')
            setPassword('')
            setfirstname('')
            setLastname('')
            setEmail('')

            dispatch(setModalAuthStatus(SUCCESS_AUTH))
        } catch (err) {
            if (!err?.status) {                
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

    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)
    const handleFirstnameInput = (e) => setfirstname(e.target.value)
    const handleLastnameInput = (e) => setLastname(e.target.value)
    const handleEmailInput = (e) => setEmail(e.target.value)

    return (
        <Layout>
            <div className="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Dialog.Title as="h3" className="mb-4 text-center font-semibold leading-6 text-gray-900">
                    {type === OPEN_LOGIN ? 'Iniciar Sesión' : 'Registro'}
                </Dialog.Title>
                <p ref={errRef} className={errMsg ? "text-center text-red-500 errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Nombre de usuario
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="username"
                                autoComplete="off"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                ref={usernameRef}
                                value={username}
                                onChange={handleUsernameInput}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Contraseña
                            </label>
                            {/* <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div> */}
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={password}
                                onChange={handlePasswordInput}
                            />
                        </div>
                    </div>

                    {type === OPEN_REGISTER && <div>
                        <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                            Nombre completo
                        </label>
                        <div className="mt-2">
                            <input
                                id="firstname"
                                name="firstname"
                                type="firstname"
                                autoComplete="off"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={firstname}
                                onChange={handleFirstnameInput}
                            />
                        </div>
                    </div>}

                    {type === OPEN_REGISTER && <div>
                        <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                            Apellidos
                        </label>
                        <div className="mt-2">
                            <input
                                id="lastname"
                                name="lastname"
                                type="lastname"
                                autoComplete="off"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={lastname}
                                onChange={handleLastnameInput}
                            />
                        </div>
                    </div>}

                    {type === OPEN_REGISTER && <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="off"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={email}
                                onChange={handleEmailInput}
                            />
                        </div>
                    </div>}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Ingresar
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    {type === OPEN_LOGIN ? 'no tienes cuenta? ' : 'tienes una cuenta? '}
                    <a onClick={e => setType(type === OPEN_LOGIN ? OPEN_REGISTER : OPEN_LOGIN)} className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        {type === OPEN_LOGIN ? 'Registro' : 'Iniciar Sesión'}
                    </a>
                </p>
            </div>
        </Layout>
    )
}
