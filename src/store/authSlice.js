import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../lib/supabaseClient'

// ── PRIJAVA ──────────────────────────────────────────
export const loginAdmin = createAsyncThunk('auth/loginAdmin', async ({ email, password }, { rejectWithValue }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return rejectWithValue(error.message)
  return { admin: data.user, token: data.session.access_token }
})

// ── PROVJERA POSTOJEĆE SESIJE (npr. nakon refresh-a) ─
export const checkSession = createAsyncThunk('auth/checkSession', async () => {
  const { data } = await supabase.auth.getSession()
  if (!data.session) return null
  return { admin: data.session.user, token: data.session.access_token }
})

// ── ODJAVA ───────────────────────────────────────────
export const logoutAdmin = createAsyncThunk('auth/logoutAdmin', async () => {
  await supabase.auth.signOut()
  return null
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    admin: null,
    token: null,
    loading: false,
    checkedSession: false,
    error: null,
  },
  reducers: {
    // zadržano radi kompatibilnosti; login sad prolazi kroz thunk loginAdmin
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => { state.loading = true; state.error = null })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.isLoggedIn = true
        state.admin = action.payload.admin
        state.token = action.payload.token
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Pogrešan email ili lozinka.'
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.checkedSession = true
        if (action.payload) {
          state.isLoggedIn = true
          state.admin = action.payload.admin
          state.token = action.payload.token
        }
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.isLoggedIn = false
        state.admin = null
        state.token = null
      })
  }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
