"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ALL_CATEGORIES } from '@/constans/status';
import { useRemoveEntryMutation } from '@/redux/feature/cart/cartApiSlice';
import { selectCart, setCart, setStatusCart } from '@/redux/feature/cart/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const entries = cart?.entries ?? [];
  const [removeEntry, { isLoading: isRemoving }] = useRemoveEntryMutation();
  const [removeError, setRemoveError] = useState('');

  const onRemoveEntry = async (entryId) => {
    setRemoveError('');

    try {
      const updatedCart = await removeEntry({ entryId, cartId: cart?.id }).unwrap();
      dispatch(setCart(updatedCart));
      dispatch(setStatusCart('closed'));
    } catch (error) {
      setRemoveError('No se pudo quitar el producto. Inténtalo nuevamente.');
      console.error('Error removing cart entry', error);
    }
  };

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pb-6">
          <p className="text-sm font-medium text-indigo-600">Tu compra</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Carro de compras
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Revisa los productos antes de continuar con tu compra.
          </p>
        </div>

        {entries.length === 0 ? (
          <div className="py-16 text-center">
            <h2 className="text-xl font-semibold text-gray-900">Tu carro está vacío</h2>
            <p className="mt-2 text-gray-500">Agrega productos para verlos aquí.</p>
            <Link
              href={`/products/${ALL_CATEGORIES}`}
              className="mt-6 inline-flex rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Seguir comprando
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-12 lg:grid-cols-3 lg:items-start">
            <section className="lg:col-span-2" aria-label="Productos en el carro">
              <ul className="divide-y divide-gray-200">
                {entries.map((entry) => {
                  const image = entry.product?.images?.[0];

                  return (
                    <li key={entry.id} className="flex gap-4 py-6 sm:gap-6">
                      <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 sm:h-36 sm:w-32">
                        {image?.url ? (
                          <Image
                            src={image.url}
                            alt={image.name ?? entry.product?.name ?? 'Producto'}
                            fill
                            sizes="(max-width: 640px) 96px, 128px"
                            className="object-cover object-center"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center px-2 text-center text-xs text-gray-400">
                            Imagen no disponible
                          </div>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div className="flex justify-between gap-4">
                          <div>
                            <h2 className="font-semibold text-gray-900">
                              {entry.product?.name ?? 'Producto'}
                            </h2>
                            {entry.product?.color && (
                              <p className="mt-1 text-sm text-gray-500">Color: {entry.product.color}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">Cantidad: {entry.amount}</p>
                          </div>
                          <p className="whitespace-nowrap font-medium text-gray-900">
                            S/. {entry.total ?? '00.00'}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveEntry(entry.id)}
                          disabled={isRemoving}
                          className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <TrashIcon className="h-4 w-4" aria-hidden="true" />
                          {isRemoving ? 'Quitando…' : 'Quitar'}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {removeError && (
                <p role="alert" className="mt-4 text-sm text-red-600">
                  {removeError}
                </p>
              )}
            </section>

            <aside className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Resumen del pedido</h2>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">S/. {cart?.subTotal ?? '00.00'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Envío</dt>
                  <dd className="font-medium text-gray-900">
                    {cart?.delivery ? `S/. ${cart.delivery}` : 'Calculado en el checkout'}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4 text-base">
                  <dt className="font-semibold text-gray-900">Total</dt>
                  <dd className="font-semibold text-gray-900">
                    S/. {cart?.total ?? cart?.subTotal ?? '00.00'}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-xs leading-5 text-gray-500">
                El costo de envío y los impuestos se calcularán al completar los datos de entrega.
              </p>
              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Continuar con el checkout
              </Link>
              <Link
                href={`/products/${ALL_CATEGORIES}`}
                className="mt-4 flex justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Seguir comprando <span aria-hidden="true">&rarr;</span>
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
