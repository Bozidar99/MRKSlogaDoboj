import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../lib/supabaseClient'

export const fetchIstorija = createAsyncThunk('istorija/fetchIstorija', async () => {
  const { data, error } = await supabase
    .from('history')
    .select('*')
    .order('godina', { ascending: true })
  if (error) throw error
  return data
})

export const dodajIstoriju = createAsyncThunk('istorija/dodajIstoriju', async (item) => {
  const { data, error } = await supabase.from('history').insert([item]).select().single()
  if (error) throw error
  return data
})

export const urediIstoriju = createAsyncThunk('istorija/urediIstoriju', async (item) => {
  const { id, ...rest } = item
  const { data, error } = await supabase.from('history').update(rest).eq('id', id).select().single()
  if (error) throw error
  return data
})

export const obrisiIstoriju = createAsyncThunk('istorija/obrisiIstoriju', async (id) => {
  const { error } = await supabase.from('history').delete().eq('id', id)
  if (error) throw error
  return id
})

const istorijaSlice = createSlice({
  name: 'istorija',
  initialState: {
    istorija: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIstorija.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchIstorija.fulfilled, (state, action) => { state.loading = false; state.istorija = action.payload })
      .addCase(fetchIstorija.rejected, (state) => { state.loading = false; state.error = 'Greška pri učitavanju istorije.' })
      .addCase(dodajIstoriju.fulfilled, (state, action) => { state.istorija.push(action.payload) })
      .addCase(urediIstoriju.fulfilled, (state, action) => {
        const i = state.istorija.findIndex(x => x.id === action.payload.id)
        if (i !== -1) state.istorija[i] = action.payload
      })
      .addCase(obrisiIstoriju.fulfilled, (state, action) => {
        state.istorija = state.istorija.filter(x => x.id !== action.payload)
      })
  }
})

export default istorijaSlice.reducer
