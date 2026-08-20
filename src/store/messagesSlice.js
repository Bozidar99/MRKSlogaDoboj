import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../lib/supabaseClient'

// ── POŠALJI PORUKU (javno, sa Contact forme) ────────
export const posaljiPoruku = createAsyncThunk('messages/posaljiPoruku', async (poruka) => {
  const { error } = await supabase.from('contact_messages').insert([poruka])
  if (error) throw error
})

// ── UČITAJ SVE PORUKE (admin) ───────────────────────
export const fetchPoruke = createAsyncThunk('messages/fetchPoruke', async () => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
})

// ── OZNAČI KAO PROČITANO ────────────────────────────
export const oznaciProcitano = createAsyncThunk('messages/oznaciProcitano', async (id) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ procitano: true })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
})

// ── OBRIŠI PORUKU ────────────────────────────────────
export const obrisiPoruku = createAsyncThunk('messages/obrisiPoruku', async (id) => {
  const { error } = await supabase.from('contact_messages').delete().eq('id', id)
  if (error) throw error
  return id
})

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    poruke: [],
    loading: false,
    sending: false,
    sent: false,
    error: null,
  },
  reducers: {
    resetSent: (state) => { state.sent = false },
  },
  extraReducers: (builder) => {
    builder
      .addCase(posaljiPoruku.pending, (state) => { state.sending = true; state.error = null })
      .addCase(posaljiPoruku.fulfilled, (state) => { state.sending = false; state.sent = true })
      .addCase(posaljiPoruku.rejected, (state, action) => { state.sending = false; state.error = action.error.message })

      .addCase(fetchPoruke.pending, (state) => { state.loading = true })
      .addCase(fetchPoruke.fulfilled, (state, action) => { state.loading = false; state.poruke = action.payload })
      .addCase(fetchPoruke.rejected, (state, action) => { state.loading = false; state.error = action.error.message })

      .addCase(oznaciProcitano.fulfilled, (state, action) => {
        const i = state.poruke.findIndex(p => p.id === action.payload.id)
        if (i !== -1) state.poruke[i] = action.payload
      })

      .addCase(obrisiPoruku.fulfilled, (state, action) => {
        state.poruke = state.poruke.filter(p => p.id !== action.payload)
      })
  }
})

export const { resetSent } = messagesSlice.actions
export default messagesSlice.reducer
