import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchIgraci = createAsyncThunk('players/fetchIgraci', async () => {
  const response = await axios.get('/igraci.json')
  return response.data.igraci
})

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    golmani:  [],
    krila:    [],
    bekovi:   [],
    pivoti:   [],
    treneri:  [],
    loading:  false,
    error:    null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIgraci.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchIgraci.fulfilled, (state, action) => {
        state.loading  = false
        state.golmani  = action.payload.golmani
        state.krila    = action.payload.krila
        state.bekovi   = action.payload.bekovi
        state.pivoti   = action.payload.pivoti
        state.treneri  = action.payload.treneri
      })
      .addCase(fetchIgraci.rejected, (state, action) => {
        state.loading = false
        state.error   = "Greška pri učitavanju igrača."
      })
  }
})

export default playersSlice.reducer