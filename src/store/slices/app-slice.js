const { createSlice } = require("@reduxjs/toolkit");

const aooSlice = createSlice({
  name: "app",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = aooSlice.actions;
export default aooSlice.reducer;
