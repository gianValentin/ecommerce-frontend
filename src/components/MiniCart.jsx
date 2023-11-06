"use client";
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { selectCart, selectStatus, setCart, setStatusCart } from '@/redux/feature/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRemoveEntryMutation } from '@/redux/feature/cart/cartApiSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MiniCart({ }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const cart = useSelector(selectCart)
  const status = useSelector(selectStatus)

  const [removeEntry, { isLoading: isLoadingCart }] = useRemoveEntryMutation()

  const valid = [cart, cart?.entries?.length > 0].every(Boolean)

  useEffect(() => {
    if (status === 'opened' || status === 'added') {
      setOpen(true)
      dispatch(setStatusCart('closed'))
    }
  }, [status, dispatch])

  const onRemoveEntryClick = async (entryId) => {
    if (!entryId) console.error(`Entry id error [${entryId}]`);

    try {
      const res = await removeEntry({ entryId, cartId: cart?.id }).unwrap()
      dispatch(setCart(res))
    } catch (error) {
      console.error("Error add to cart", error);
    }
  }

  const onButtonCheckoutClick = () => {
    setOpen(false)
    router.push('/checkout')
  }

  const listEntries = (entries) => (
    valid && entries.map((entrie) => (
      <li key={entrie.id} className="flex py-6">
        {/* Image */}
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <Image
            src={entrie.product?.images[0]?.url ?? ''}
            alt={entrie.product?.images[0]?.name ?? 'product'}
            className="h-full w-full object-cover object-center"            
            width={500}
            height={500}
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          {/* Features */}
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href={`#`}>{entrie.product.name}</a>
              </h3>
              <p className="ml-4">{`S/. ${entrie?.total ?? '00.00'}`}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">{entrie.product?.color ?? 'Unico'}</p>
          </div>

          <div className="flex flex-1 items-end justify-between text-sm">
            {/* quantity */}
            <p className="text-gray-500">Qty {entrie.amount}</p>
            {/* Remove */}
            <div className="flex">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={e => onRemoveEntryClick(entrie.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    ))
  )


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Carrito de compras</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Cerrar Carrito</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {listEntries(cart?.entries)}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{`S/. ${cart?.subTotal ?? '00.00'}`}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Costo de envío y impuestos son calculados en el checkout.</p>
                      <div className="mt-6">
                        <a                          
                          onClick={onButtonCheckoutClick}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          o {' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continuar comprando
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
