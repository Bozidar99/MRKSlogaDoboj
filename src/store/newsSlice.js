import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../lib/supabaseClient'

// ── UČITAJ SVE VIJESTI ──────────────────────────────
export const fetchVijesti = createAsyncThunk('news/fetchVijesti', async () => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('datum', { ascending: false })
  if (error) throw error
  return data
})

// ── UČITAJ IGRAČA UTAKMICE ──────────────────────────
export const fetchIgracUtakmice = createAsyncThunk('news/fetchIgracUtakmice', async () => {
  const { data, error } = await supabase
    .from('igrac_utakmice')
    .select('*')
    .eq('id', 1)
    .single()
  if (error) throw error
  return data
})

// ── DODAJ VIJEST ─────────────────────────────────────
export const dodajVijest = createAsyncThunk('news/dodajVijest', async (vijest) => {
  const { id, ...rest } = vijest
  const { data, error } = await supabase.from('news').insert([rest]).select().single()
  if (error) throw error
  return data
})

// ── UREDI VIJEST ─────────────────────────────────────
export const urediVijest = createAsyncThunk('news/urediVijest', async (vijest) => {
  const { id, ...rest } = vijest
  const { data, error } = await supabase.from('news').update(rest).eq('id', id).select().single()
  if (error) throw error
  return data
})

// ── OBRIŠI VIJEST ────────────────────────────────────
export const obrisiVijest = createAsyncThunk('news/obrisiVijest', async (id) => {
  const { error } = await supabase.from('news').delete().eq('id', id)
  if (error) throw error
  return id
})

// ── POSTAVI IGRAČA UTAKMICE ─────────────────────────
export const postaviIgracaUtakmice = createAsyncThunk('news/postaviIgracaUtakmice', async (igrac) => {
  const { data, error } = await supabase
    .from('igrac_utakmice')
    .update(igrac)
    .eq('id', 1)
    .select()
    .single()
  if (error) throw error
  return data
})

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    vijesti: [],
    igracUtakmice: { ime: '', golova: 0, utakmica: '', datum: '', opis: '' },
    loading: false,
    saving: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVijesti.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchVijesti.fulfilled, (state, action) => { state.loading = false; state.vijesti = action.payload })
      .addCase(fetchVijesti.rejected, (state, action) => { state.loading = false; state.error = action.error.message })

      .addCase(fetchIgracUtakmice.fulfilled, (state, action) => { state.igracUtakmice = action.payload })

      .addCase(dodajVijest.pending, (state) => { state.saving = true })
      .addCase(dodajVijest.fulfilled, (state, action) => { state.saving = false; state.vijesti.unshift(action.payload) })
      .addCase(dodajVijest.rejected, (state, action) => { state.saving = false; state.error = action.error.message })

      .addCase(urediVijest.fulfilled, (state, action) => {
        const i = state.vijesti.findIndex(v => v.id === action.payload.id)
        if (i !== -1) state.vijesti[i] = action.payload
      })

      .addCase(obrisiVijest.fulfilled, (state, action) => {
        state.vijesti = state.vijesti.filter(v => v.id !== action.payload)
      })

      .addCase(postaviIgracaUtakmice.fulfilled, (state, action) => { state.igracUtakmice = action.payload })
  }
})

export default newsSlice.reducer
