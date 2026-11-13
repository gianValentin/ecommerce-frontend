import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Nav from './Nav'
import { useLazyLogoutQuery } from '@/redux/feature/auth/authApiSlice'
import { usePathname, useRouter } from 'next/navigation'
import { renderWithProviders } from '@/test-utils/renderWithProviders'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => require('react').createElement('a', { href, ...props }, children),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, fetchPriority, ...props }) => require('react').createElement('img', props),
}))

jest.mock('@/redux/feature/auth/authApiSlice', () => ({
  useLazyLogoutQuery: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}))

jest.mock('@headlessui/react', () => {
  const React = require('react')
  const Disclosure = ({ as: Element = 'div', children, ...props }) =>
    React.createElement(Element, props, typeof children === 'function' ? children({ open: false }) : children)
  Disclosure.Button = ({ as: Element = 'button', children, ...props }) =>
    React.createElement(Element, props, children)
  Disclosure.Button.displayName = 'MockDisclosureButton'
  Disclosure.Panel = ({ as: Element = 'div', children, ...props }) =>
    React.createElement(Element, props, children)
  Disclosure.Panel.displayName = 'MockDisclosurePanel'

  const Menu = ({ as: Element = 'div', children, ...props }) =>
    React.createElement(Element, props, children)
  Menu.Button = ({ as: Element = 'button', children, ...props }) =>
    React.createElement(Element, props, children)
  Menu.Button.displayName = 'MockMenuButton'
  Menu.Items = ({ as: Element = 'div', children, ...props }) =>
    React.createElement(Element, props, children)
  Menu.Items.displayName = 'MockMenuItems'
  Menu.Item = ({ children }) => {
    const item = typeof children === 'function' ? children({ active: false }) : children
    return React.cloneElement(item, { role: 'menuitem' })
  }

  const Transition = ({ children }) => children
  Transition.Child = ({ children }) => children

  return { Disclosure, Menu, Transition }
})

describe('Nav profile navigation', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useLazyLogoutQuery.mockReturnValue([jest.fn()])
    usePathname.mockReturnValue('/')
    useRouter.mockReturnValue({ push: mockPush })
  })

  it('opens the profile page from the account menu', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <Nav />,
      { preloadedState: { user: { userSession: { firstname: 'Ada' }, status: 'idle' } } }
    )

    await user.click(screen.getByRole('button', { name: 'Open user menu' }))
    await user.click(screen.getByRole('menuitem', { name: 'Perfil' }))

    expect(mockPush).toHaveBeenCalledWith('/profile')
  })
})
