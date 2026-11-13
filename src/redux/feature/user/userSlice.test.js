import userReducer, { removeUserSession, setUserSession } from './userSlice'
import { IDLE } from '@/constans/status'

describe('userSlice', () => {
  it('stores and removes the current user session', () => {
    const user = { firstname: 'Ada', email: 'ada@example.com' }
    const initialState = userReducer(undefined, { type: 'unknown' })
    const sessionState = userReducer(initialState, setUserSession(user))

    expect(initialState).toEqual({ userSession: null, status: IDLE })
    expect(sessionState.userSession).toEqual(user)
    expect(userReducer(sessionState, removeUserSession()).userSession).toBeNull()
  })
})
