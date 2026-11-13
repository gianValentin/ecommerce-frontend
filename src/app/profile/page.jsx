"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_LOGIN } from '@/constans/status';
import { logOut, setModalAuthStatus } from '@/redux/feature/auth/authSlice';
import { useLazyLogoutQuery } from '@/redux/feature/auth/authApiSlice';
import { removeCart } from '@/redux/feature/cart/cartSlice';
import { removeUserSession, selectUserSession } from '@/redux/feature/user/userSlice';

const navigationItems = [
  { id: 'profile', label: 'Mi perfil' },
  { id: 'orders', label: 'Mis pedidos', href: '/orders' },
  { id: 'addresses', label: 'Direcciones' },
  { id: 'favorites', label: 'Favoritos' },
  { id: 'preferences', label: 'Preferencias' },
];

function getDefaultAddress(user) {
  if (user?.defaultAddress) return user.defaultAddress;

  if (Array.isArray(user?.addresses)) {
    return user.addresses.find((address) => address.isDefault || address.default) ?? null;
  }

  return user?.address ?? null;
}

function AddressCard({ address }) {
  if (!address) {
    return (
      <p className="mt-4 text-sm text-gray-500">
        No hay una dirección predeterminada disponible en tu perfil.
      </p>
    );
  }

  if (typeof address === 'string') {
    return <p className="mt-4 text-sm leading-6 text-gray-700">{address}</p>;
  }

  const addressLines = [
    address.recipient ?? address.fullName ?? address.name,
    address.street ?? address.addressLine1 ?? address.address,
    address.addressLine2 ?? address.reference,
    [address.district, address.city, address.province ?? address.state]
      .filter(Boolean)
      .join(', '),
    [address.postalCode ?? address.zipCode, address.country].filter(Boolean).join(' · '),
    address.phone,
  ].filter(Boolean);

  return addressLines.length > 0 ? (
    <address className="mt-4 space-y-1 text-sm not-italic leading-6 text-gray-700">
      {addressLines.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
    </address>
  ) : (
    <p className="mt-4 text-sm text-gray-500">
      No hay una dirección predeterminada disponible en tu perfil.
    </p>
  );
}

function Field({ id, label, type = 'text', value, onChange, autoComplete }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );
}

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userSession = useSelector(selectUserSession);
  const [triggerLogout] = useLazyLogoutQuery();
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({ firstname: '', lastname: '', email: '' });
  const [password, setPassword] = useState({ current: '', next: '', confirm: '' });
  const [profileFeedback, setProfileFeedback] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const defaultAddress = getDefaultAddress(userSession);

  useEffect(() => {
    if (userSession) {
      setProfile({
        firstname: userSession.firstname ?? '',
        lastname: userSession.lastname ?? '',
        email: userSession.email ?? '',
      });
    }
  }, [userSession]);

  const onLogout = () => {
    triggerLogout();
    dispatch(logOut());
    dispatch(removeUserSession());
    dispatch(removeCart());
    router.push('/');
  };

  const onProfileSubmit = (event) => {
    event.preventDefault();
    setProfileFeedback('El guardado de datos todavía no está conectado al servicio de perfil.');
  };

  const onPasswordSubmit = (event) => {
    event.preventDefault();

    if (password.next !== password.confirm) {
      setPasswordFeedback('La nueva contraseña y su confirmación no coinciden.');
      return;
    }

    setPasswordFeedback('El cambio de contraseña todavía no está conectado al servicio de perfil.');
  };

  if (!userSession) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Inicia sesión para ver tu perfil</h1>
        <button
          type="button"
          onClick={() => dispatch(setModalAuthStatus(OPEN_LOGIN))}
          className="mt-6 rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Iniciar sesión
        </button>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pb-6">
          <p className="text-sm font-medium text-indigo-600">Cuenta</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Mi perfil</h1>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside>
            <nav aria-label="Navegación del perfil" className="space-y-1">
              {navigationItems.map((item) => (
                item.href ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium ${
                      activeSection === item.id
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              ))}
              <button
                type="button"
                onClick={onLogout}
                className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Cerrar sesión
              </button>
            </nav>
          </aside>

          <div className="min-w-0 space-y-8">
            {activeSection === 'profile' && (
              <>
                <section className="rounded-lg border border-gray-200 p-5 sm:p-7">
                  <div className="border-b border-gray-200 pb-5">
                    <h2 className="text-lg font-semibold text-gray-900">Datos personales</h2>
                    <p className="mt-1 text-sm text-gray-500">Actualiza la información de tu cuenta.</p>
                  </div>
                  <form onSubmit={onProfileSubmit} className="mt-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        id="firstname"
                        label="Nombre"
                        value={profile.firstname}
                        autoComplete="given-name"
                        onChange={(event) => setProfile({ ...profile, firstname: event.target.value })}
                      />
                      <Field
                        id="lastname"
                        label="Apellido"
                        value={profile.lastname}
                        autoComplete="family-name"
                        onChange={(event) => setProfile({ ...profile, lastname: event.target.value })}
                      />
                    </div>
                    <Field
                      id="email"
                      label="Correo electrónico"
                      type="email"
                      value={profile.email}
                      autoComplete="email"
                      onChange={(event) => setProfile({ ...profile, email: event.target.value })}
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      Guardar cambios
                    </button>
                    {profileFeedback && <p role="status" className="text-sm text-amber-700">{profileFeedback}</p>}
                  </form>
                </section>

                <section className="rounded-lg border border-gray-200 p-5 sm:p-7">
                  <div className="border-b border-gray-200 pb-5">
                    <h2 className="text-lg font-semibold text-gray-900">Cambiar contraseña</h2>
                    <p className="mt-1 text-sm text-gray-500">Usa una contraseña segura que no utilices en otros sitios.</p>
                  </div>
                  <form onSubmit={onPasswordSubmit} className="mt-6 space-y-5">
                    <Field
                      id="current-password"
                      label="Contraseña actual"
                      type="password"
                      value={password.current}
                      autoComplete="current-password"
                      onChange={(event) => setPassword({ ...password, current: event.target.value })}
                    />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        id="new-password"
                        label="Nueva contraseña"
                        type="password"
                        value={password.next}
                        autoComplete="new-password"
                        onChange={(event) => setPassword({ ...password, next: event.target.value })}
                      />
                      <Field
                        id="confirm-password"
                        label="Confirmar nueva contraseña"
                        type="password"
                        value={password.confirm}
                        autoComplete="new-password"
                        onChange={(event) => setPassword({ ...password, confirm: event.target.value })}
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      Actualizar contraseña
                    </button>
                    {passwordFeedback && <p role="status" className="text-sm text-amber-700">{passwordFeedback}</p>}
                  </form>
                </section>

                <section className="rounded-lg border border-gray-200 p-5 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Dirección predeterminada</h2>
                      <p className="mt-1 text-sm text-gray-500">Dirección asociada a tu cuenta.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveSection('addresses')}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Ver direcciones
                    </button>
                  </div>
                  <AddressCard address={defaultAddress} />
                </section>
              </>
            )}

            {activeSection === 'addresses' && (
              <section className="rounded-lg border border-gray-200 p-5 sm:p-7">
                <h2 className="text-lg font-semibold text-gray-900">Direcciones</h2>
                <p className="mt-1 text-sm text-gray-500">Dirección predeterminada de tu cuenta.</p>
                <AddressCard address={defaultAddress} />
              </section>
            )}

            {activeSection === 'favorites' && (
              <section className="rounded-lg border border-gray-200 p-5 sm:p-7">
                <h2 className="text-lg font-semibold text-gray-900">Favoritos</h2>
                <p className="mt-2 text-sm text-gray-500">No hay productos favoritos disponibles.</p>
              </section>
            )}

            {activeSection === 'preferences' && (
              <section className="rounded-lg border border-gray-200 p-5 sm:p-7">
                <h2 className="text-lg font-semibold text-gray-900">Preferencias</h2>
                <p className="mt-2 text-sm text-gray-500">Tus preferencias de cuenta aparecerán aquí.</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
