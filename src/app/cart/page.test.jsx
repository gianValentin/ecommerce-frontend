import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartPage from './page'
import { useRemoveEntryMutation } from '@/redux/feature/cart/cartApiSlice'
import { renderWithProviders } from '@/test-utils/renderWithProviders'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => require('react').createElement('a', { href, ...props }, children),
}))

jest.mock('@/redux/feature/cart/cartApiSlice', () => ({
  useRemoveEntryMutation: jest.fn(),
}))

const cart = {
  id: 'cart-1',
  entries: [
    {
      id: 'entry-1',
      amount: 2,
      total: '120.00',
      product: { name: 'Zapatilla de prueba', color: 'Negro' },
    },
  ],
  subTotal: '120.00',
  delivery: '5.00',
  total: '125.00',
}

const createPreloadedState = (cartValue) => ({
  cart: { amount: 1, cart: cartValue, status: 'idle' },
})

describe('CartPage', () => {
  const removeEntry = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useRemoveEntryMutation.mockReturnValue([removeEntry, { isLoading: false }])
  })

  it('shows an empty-cart message and a link to continue shopping', () => {
    renderWithProviders(<CartPage />, { preloadedState: createPreloadedState(null) })

    expect(screen.getByRole('heading', { name: 'Tu carro está vacío' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Seguir comprando' })).toHaveAttribute('href', '/products/all')
  })

  it('renders cart items and the order summary', () => {
    renderWithProviders(<CartPage />, { preloadedState: createPreloadedState(cart) })

    expect(screen.getByRole('heading', { name: 'Carro de compras' })).toBeInTheDocument()
    expect(screen.getByText('Zapatilla de prueba')).toBeInTheDocument()
    expect(screen.getByText('Cantidad: 2')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Resumen del pedido' })).toBeInTheDocument()
    expect(screen.getByText('S/. 125.00')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Continuar con el checkout' })).toHaveAttribute('href', '/checkout')
  })

  it('removes an item and leaves the mini-cart status closed', async () => {
    const user = userEvent.setup()
    const updatedCart = { ...cart, entries: [] }
    removeEntry.mockReturnValue({ unwrap: () => Promise.resolve(updatedCart) })
    const { store } = renderWithProviders(<CartPage />, { preloadedState: createPreloadedState(cart) })

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Quitar' }))
    })

    expect(removeEntry).toHaveBeenCalledWith({ entryId: 'entry-1', cartId: 'cart-1' })
    expect(store.getState().cart.cart).toEqual(updatedCart)
    expect(store.getState().cart.status).toBe('closed')
    expect(await screen.findByRole('heading', { name: 'Tu carro está vacío' })).toBeInTheDocument()
  })
})
