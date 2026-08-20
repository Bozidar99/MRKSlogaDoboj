import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './newsSlice'
import matchReducer from './matchSlice'
import authReducer from './authSlice'
import playersReducer from './playersSlice'
import istorijaReducer from './istorijaSlice'
import galleryReducer from './gallerySlice'
import messagesReducer from './messagesSlice'

export const store = configureStore({
  reducer: {
    news: newsReducer,
    match: matchReducer,
    auth: authReducer,
    players: playersReducer,
    istorija: istorijaReducer,
    gallery: galleryReducer,
    messages: messagesReducer
  }
})
