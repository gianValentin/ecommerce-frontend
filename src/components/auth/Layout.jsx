'use client';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalAuthStatus, setModalAuthStatus } from '@/redux/feature/auth/authSlice';
import { CLOSED, OPEN_LOGIN, OPEN_REGISTER, SUCCESS_AUTH } from '@/constans/status';

export default function Layout({ children }) {
    const dispatch = useDispatch()
    const modalAuthStatus = useSelector(selectModalAuthStatus)

    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    useEffect(() => {
        if (modalAuthStatus === OPEN_LOGIN || modalAuthStatus === OPEN_REGISTER) {
            setOpen(true)
            dispatch(setModalAuthStatus(CLOSED))
        } else if ( modalAuthStatus === SUCCESS_AUTH) {
            setOpen(false)
            dispatch(setModalAuthStatus(CLOSED))
        }
    }, [modalAuthStatus, dispatch])

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
