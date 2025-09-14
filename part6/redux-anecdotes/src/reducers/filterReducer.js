import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterWords(state, action) {
      return action.payload
    }
  }
})
export const { filterWords } = filterSlice.actions
export default filterSlice.reducer