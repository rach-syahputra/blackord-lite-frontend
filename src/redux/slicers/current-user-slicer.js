import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from '../../api-resources/user/service'

export const fetchCurrentUser = createAsyncThunk('getCurrentUser', async () => {
  const response = await userService.getCurrentUser()

  if (response.success) return response.data
})

export const removeCurrentUser = createAsyncThunk(
  'removeCurrentUser',
  async () => {
    const response = await userService.logout()

    return response
  }
)

const currentUserSlice = createSlice({
  name: 'current-user',
  initialState: {
    isLoading: false,
    data: null,
    error: false
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = true
    })
    builder.addCase(removeCurrentUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(removeCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false
      if (action.payload.success) state.data = null
    })
    builder.addCase(removeCurrentUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = true
    })
  }
})

export default currentUserSlice.reducer
