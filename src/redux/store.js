import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import currentUserReducer from './slicers/current-user-slicer'
import playerReducer from './slicers/player-slicer'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['player']
}

const playerConfig = {
  key: 'player',
  storage,
  blacklist: ['isPlaying']
}

const reducer = combineReducers({
  currentUser: currentUserReducer,
  player: persistReducer(playerConfig, playerReducer)
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

export const persistor = persistStore(store)
