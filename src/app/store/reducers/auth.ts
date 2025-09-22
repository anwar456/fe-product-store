import { getItem, setItem } from '@app/helpers/localstorage.helper'
import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

const me = getItem('me')

const initialState = {
  isLoggedIn: !!getItem('credentials'),
  credentials: getItem('credentials'),
  privileges: getItem('priv'),
  authUser: me,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      setItem('credentials', payload)
      state.isLoggedIn = true
      state.credentials = payload
    },
    setPrivileges: (state, { payload }) => {
      setItem('priv', payload)
      state.privileges = payload
    },
    refreshToken: (state, { payload }) => {
      setItem('credentials', payload)
      state.isLoggedIn = true
      state.credentials = payload
    },
    setLoggedInUserDetail: (state, { payload }) => {
      setItem('me', payload)
      state.authUser = payload
    },
    setSessionLifetime: (_state, { payload }) => {
      setItem('accepted', {
        remember_me: payload.rememberMe,
        time: moment().valueOf(),
      })
    },
    logoutUser: (state) => {
      localStorage.removeItem('credentials')
      localStorage.removeItem('accepted')
      localStorage.removeItem('power')
      localStorage.removeItem('me')
      localStorage.clear()

      state.authUser = {}
      state.isLoggedIn = false
      state.privileges = null
      state.credentials = null
    },
    loadUser: (state, { payload }) => {
      state.authUser = payload
    },
  },
})

export const { loginUser, setLoggedInUserDetail, logoutUser, loadUser, setSessionLifetime, refreshToken, setPrivileges } = authSlice.actions

export default authSlice.reducer
