import { createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    ids: [],
    activeId: undefined,
    isPlaying: false
  },
  reducers: {
    setIds: (state, action) => {
      state.ids = action.payload
    },
    setActiveId: (state, action) => {
      state.activeId = action.payload
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload
    },
    reset: (state) => {
      state.ids = []
      state.activeId = undefined
    }
  }
})

export const { setIds, setActiveId, setIsPlaying, reset } = playerSlice.actions
export default playerSlice.reducer
