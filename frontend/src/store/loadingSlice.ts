import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface ILoadingState {
  loading: boolean
}

const initialState: ILoadingState = {
  loading: false,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLoading } = loadingSlice.actions

// Selector
export const selectLoading = (state: RootState) => state.loading.loading;

export default loadingSlice.reducer