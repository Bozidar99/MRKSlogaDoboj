import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sljedeceUtakmice: [
    { id: 1, domacin: "Sloga", gost: "Borac", datum: "10.05.2026", vrijeme: "19:00" }
  ],
  prethodnaUtakmica: {
    domacin: "Sloga",
    golDomacin: 29,
    gost: "Borac M:TEL",
    golGost: 28,
    datum: "22.04.2026"
  },
  loading: false,
  error: null,
}

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    postaviSljedecu: (state, action) => {
      state.sljedeceUtakmice = action.payload
    },
    postaviPrethodnu: (state, action) => {
      state.prethodnaUtakmica = action.payload
    },
  }
})

export const { postaviSljedecu, postaviPrethodnu } = matchSlice.actions
export default matchSlice.reducer