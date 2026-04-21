import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './newsSlice'
import matchReducer from './matchSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    news: newsReducer,
    match: matchReducer,
    auth: authReducer,
  }
})