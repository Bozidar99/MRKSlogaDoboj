import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './newsSlice'
import matchReducer from './matchSlice'
import authReducer from './authSlice'
import playersReducer from './playersSlice'

export const store = configureStore({
  reducer: {
    news: newsReducer,
    match: matchReducer,
    auth: authReducer,
    players: playersReducer
  }
})