import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../lib/supabaseClient'

// ── UČITAJ SVE IGRAČE + TRENERE ─────────────────────
export const fetchIgraci = createAsyncThunk('players/fetchIgraci', async () => {
  const [playersRes, coachesRes] = await Promise.all([
    supabase.from('players').select('*').order('br', { ascending: true }),
    supabase.from('coaches').select('*'),
  ])
  if (playersRes.error) throw playersRes.error
  if (coachesRes.error) throw coachesRes.error

  const byKat = (kat) => playersRes.data.filter(p => p.kategorija === kat)
  return {
    golmani: byKat('golmani'),
    krila: byKat('krila'),
    bekovi: byKat('bekovi'),
    pivoti: byKat('pivoti'),
    treneri: coachesRes.data,
  }
})

// ── DODAJ IGRAČA ─────────────────────────────────────
export const dodajIgraca = createAsyncThunk('players/dodajIgraca', async ({ kljuc, igrac }) => {
  const { data, error } = await supabase
    .from('players')
    .insert([{ ...igrac, kategorija: kljuc }])
    .select()
    .single()
  if (error) throw error
  return { kljuc, igrac: data }
})

// ── UREDI IGRAČA ─────────────────────────────────────
export const urediIgraca = createAsyncThunk('players/urediIgraca', async ({ kljuc, igrac }) => {
  const { id, ...rest } = igrac
  const { data, error } = await supabase
    .from('players')
    .update(rest)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return { kljuc, igrac: data }
})

// ── OBRIŠI IGRAČA (po id-ju iz baze) ────────────────
export const obrisiIgraca = createAsyncThunk('players/obrisiIgraca', async ({ kljuc, id }) => {
  const { error } = await supabase.from('players').delete().eq('id', id)
  if (error) throw error
  return { kljuc, id }
})

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    golmani: [],
    krila: [],
    bekovi: [],
    pivoti: [],
    treneri: [],
    loading: false,
    saving: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIgraci.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchIgraci.fulfilled, (state, action) => {
        state.loading = false
        state.golmani = action.payload.golmani
        state.krila = action.payload.krila
        state.bekovi = action.payload.bekovi
        state.pivoti = action.payload.pivoti
        state.treneri = action.payload.treneri
      })
      .addCase(fetchIgraci.rejected, (state, action) => {
        state.loading = false
        state.error = 'Greška pri učitavanju igrača.'
        console.error(action.error)
      })

      .addCase(dodajIgraca.fulfilled, (state, action) => {
        state[action.payload.kljuc].push(action.payload.igrac)
      })

      .addCase(urediIgraca.fulfilled, (state, action) => {
        const arr = state[action.payload.kljuc]
        const i = arr.findIndex(p => p.id === action.payload.igrac.id)
        if (i !== -1) arr[i] = action.payload.igrac
      })

      .addCase(obrisiIgraca.fulfilled, (state, action) => {
        state[action.payload.kljuc] = state[action.payload.kljuc].filter(p => p.id !== action.payload.id)
      })
  }
})

export default playersSlice.reducer
