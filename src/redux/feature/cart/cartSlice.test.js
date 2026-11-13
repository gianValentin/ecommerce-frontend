import cartReducer, {
  removeCart,
  selectAmount,
  selectCart,
  selectNumberEntries,
  selectStatus,
  setAmount,
  setCart,
  setStatusCart,
} from './cartSlice'

describe('cartSlice', () => {
  const initialState = { amount: 1, cart: null, status: 'idle' }

  it('starts with an empty cart', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('stores cart data and marks the cart as added', () => {
    const cart = { id: 'cart-1', entries: [{ id: 'entry-1' }] }

    expect(cartReducer(initialState, setCart(cart))).toEqual({
      ...initialState,
      cart,
      status: 'added',
    })
  })

  it('updates amount and cart status', () => {
    const amountState = cartReducer(initialState, setAmount({ amount: 3 }))
    const closedState = cartReducer(amountState, setStatusCart('closed'))

    expect(amountState.amount).toBe(3)
    expect(amountState.status).toBe('standby')
    expect(closedState.status).toBe('closed')
  })

  it('clears cart data without changing the selected amount', () => {
    const populatedState = {
      amount: 2,
      cart: { entries: [{ id: 'one' }] },
      status: 'added',
    }

    expect(cartReducer(populatedState, removeCart())).toEqual({
      ...populatedState,
      cart: null,
    })
  })

  it('selects cart state and entry count', () => {
    const state = {
      cart: {
        amount: 2,
        cart: { entries: [{ id: 'one' }, { id: 'two' }] },
        status: 'opened',
      },
    }

    expect(selectAmount(state)).toBe(2)
    expect(selectCart(state)).toBe(state.cart.cart)
    expect(selectStatus(state)).toBe('opened')
    expect(selectNumberEntries(state)).toBe(2)
  })
})
