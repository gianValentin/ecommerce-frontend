import authReducer, {
  logOut,
  setCredentials,
  setModalAuthStatus,
} from './authSlice'
import { IDLE } from '@/constans/status'

describe('authSlice', () => {
  it('stores credentials and clears them on logout', () => {
    const authenticated = authReducer(
      undefined,
      setCredentials({ access_token: 'access', refresh_token: 'refresh' })
    )

    expect(authenticated).toMatchObject({
      access_token: 'access',
      refresh_token: 'refresh',
    })
    expect(authReducer(authenticated, logOut())).toMatchObject({
      access_token: null,
      refresh_token: null,
    })
  })

  it('updates the auth modal status', () => {
    expect(authReducer(undefined, { type: 'unknown' }).modal_auth_status).toBe(IDLE)
    expect(authReducer(undefined, setModalAuthStatus('open_login')).modal_auth_status).toBe('open_login')
  })
})
