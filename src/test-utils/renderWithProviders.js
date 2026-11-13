import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import authReducer from '@/redux/feature/auth/authSlice'
import cartReducer from '@/redux/feature/cart/cartSlice'
import userReducer from '@/redux/feature/user/userSlice'

export function setupStore(preloadedState) {
  return configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      user: userReducer,
    },
    preloadedState,
  })
}

export function renderWithProviders(
  ui,
  { preloadedState, store = setupStore(preloadedState), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
