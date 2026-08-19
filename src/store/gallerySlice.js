import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../lib/supabaseClient'

// ── UČITAJ SLIKE ─────────────────────────────────────
export const fetchGalerija = createAsyncThunk('gallery/fetchGalerija', async () => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
})

// ── DODAJ SLIKU (upload fajla u Storage + red u bazi) ─
export const dodajSliku = createAsyncThunk('gallery/dodajSliku', async ({ file, opis }) => {
  const fileName = `${Date.now()}-${file.name}`

  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(fileName, file)
  if (uploadError) throw uploadError

  const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName)

  const { data, error } = await supabase
    .from('gallery')
    .insert([{ url: urlData.publicUrl, opis }])
    .select()
    .single()
  if (error) throw error
  return data
})

// ── OBRIŠI SLIKU ─────────────────────────────────────
export const obrisiSliku = createAsyncThunk('gallery/obrisiSliku', async (id) => {
  const { error } = await supabase.from('gallery').delete().eq('id', id)
  if (error) throw error
  return id
})

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    slike: [],
    loading: false,
    uploading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalerija.pending, (state) => { state.loading = true })
      .addCase(fetchGalerija.fulfilled, (state, action) => { state.loading = false; state.slike = action.payload })
      .addCase(fetchGalerija.rejected, (state, action) => { state.loading = false; state.error = action.error.message })

      .addCase(dodajSliku.pending, (state) => { state.uploading = true; state.error = null })
      .addCase(dodajSliku.fulfilled, (state, action) => { state.uploading = false; state.slike.unshift(action.payload) })
      .addCase(dodajSliku.rejected, (state, action) => { state.uploading = false; state.error = action.error.message })

      .addCase(obrisiSliku.fulfilled, (state, action) => {
        state.slike = state.slike.filter(s => s.id !== action.payload)
      })
  }
})

export default gallerySlice.reducer
