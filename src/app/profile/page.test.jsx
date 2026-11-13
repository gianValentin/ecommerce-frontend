import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfilePage from './page'
import { useLazyLogoutQuery } from '@/redux/feature/auth/authApiSlice'
import { useRouter } from 'next/navigation'
import { renderWithProviders } from '@/test-utils/renderWithProviders'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => require('react').createElement('a', { href, ...props }, children),
}))

jest.mock('@/redux/feature/auth/authApiSlice', () => ({
  useLazyLogoutQuery: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const userSession = {
  firstname: 'Ada',
  lastname: 'Lovelace',
  email: 'ada@example.com',
  defaultAddress: {
    street: 'Av. Principal 123',
    city: 'Lima',
    country: 'Perú',
  },
}

describe('ProfilePage', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useLazyLogoutQuery.mockReturnValue([jest.fn()])
    useRouter.mockReturnValue({ push: mockPush })
  })

  const renderProfile = () => renderWithProviders(
    <ProfilePage />,
    { preloadedState: { user: { userSession, status: 'idle' } } }
  )

  it('shows personal details, separate password form and default address', () => {
    renderProfile()

    expect(screen.getByLabelText('Nombre')).toHaveValue('Ada')
    expect(screen.getByLabelText('Apellido')).toHaveValue('Lovelace')
    expect(screen.getByLabelText('Correo electrónico')).toHaveValue('ada@example.com')
    expect(screen.getByRole('heading', { name: 'Cambiar contraseña' })).toBeInTheDocument()
    expect(screen.getByText('Av. Principal 123')).toBeInTheDocument()
    expect(screen.getByText('Lima')).toBeInTheDocument()
  })

  it('shows validation feedback when the new passwords do not match', async () => {
    const user = userEvent.setup()
    renderProfile()

    await act(async () => {
      await user.type(screen.getByLabelText('Contraseña actual'), 'current-password')
      await user.type(screen.getByLabelText('Nueva contraseña'), 'new-password')
      await user.type(screen.getByLabelText('Confirmar nueva contraseña'), 'different-password')
      await user.click(screen.getByRole('button', { name: 'Actualizar contraseña' }))
    })

    expect(screen.getByRole('status')).toHaveTextContent('no coinciden')
  })

  it('navigates between profile sections and links to orders', async () => {
    const user = userEvent.setup()
    renderProfile()

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Favoritos' }))
    })
    expect(screen.getByText('No hay productos favoritos disponibles.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Mis pedidos' })).toHaveAttribute('href', '/orders')
  })

  it('clears the session and returns home on logout', async () => {
    const user = userEvent.setup()
    const { store } = renderProfile()

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
    })

    expect(store.getState().user.userSession).toBeNull()
    expect(store.getState().auth.access_token).toBeNull()
    expect(mockPush).toHaveBeenCalledWith('/')
  })
})
