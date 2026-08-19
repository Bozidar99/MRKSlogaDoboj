import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../lib/supabaseClient'

// ── UČITAJ SLJEDEĆU + PRETHODNU UTAKMICU + TABELU ───
export const fetchMatchData = createAsyncThunk('match/fetchMatchData', async () => {
  const [matchesRes, tableRes] = await Promise.all([
    supabase.from('matches').select('*'),
    supabase.from('league_table').select('*').order('bod', { ascending: false }),
  ])
  if (matchesRes.error) throw matchesRes.error
  if (tableRes.error) throw tableRes.error

  const sljedeca = matchesRes.data.find(m => m.tip === 'sljedeca') || null
  const prethodna = matchesRes.data.find(m => m.tip === 'prethodna') || null

  return { sljedeca, prethodna, tabela: tableRes.data }
})

// ── AŽURIRAJ SLJEDEĆU UTAKMICU ──────────────────────
export const postaviSljedecu = createAsyncThunk('match/postaviSljedecu', async (podaci) => {
  const { data, error } = await supabase
    .from('matches')
    .update(podaci)
    .eq('tip', 'sljedeca')
    .select()
    .single()
  if (error) throw error
  return data
})

// ── AŽURIRAJ PRETHODNU UTAKMICU ─────────────────────
export const postaviPrethodnu = createAsyncThunk('match/postaviPrethodnu', async (podaci) => {
  const { data, error } = await supabase
    .from('matches')
    .update(podaci)
    .eq('tip', 'prethodna')
    .select()
    .single()
  if (error) throw error
  return data
})

// ── AŽURIRAJ CIJELU TABELU LIGE ─────────────────────
export const sacuvajTabelu = createAsyncThunk('match/sacuvajTabelu', async (redovi) => {
  // Ažuriramo svaki red pojedinačno po id-ju (izbjegava sukob sa auto-generisanom id kolonom)
  const rezultati = await Promise.all(
    redovi.map(async (red) => {
      const { id, ...rest } = red
      const { data, error } = await supabase
        .from('league_table')
        .update(rest)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data
    })
  )
  return rezultati
})

const matchSlice = createSlice({
  name: 'match',
  initialState: {
    sljedeca: null,
    prethodna: null,
    tabela: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatchData.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchMatchData.fulfilled, (state, action) => {
        state.loading = false
        state.sljedeca = action.payload.sljedeca
        state.prethodna = action.payload.prethodna
        state.tabela = action.payload.tabela
      })
      .addCase(fetchMatchData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(postaviSljedecu.fulfilled, (state, action) => { state.sljedeca = action.payload })
      .addCase(postaviPrethodnu.fulfilled, (state, action) => { state.prethodna = action.payload })
      .addCase(sacuvajTabelu.fulfilled, (state, action) => { state.tabela = action.payload })
  }
})

export default matchSlice.reducer
