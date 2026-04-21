import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  admin: null,
  token: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.admin = action.payload.admin
      state.token = action.payload.token
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.admin = null
      state.token = null
    },
  }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer