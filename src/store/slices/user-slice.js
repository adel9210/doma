const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "app",
  initialState: {
    user: undefined,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
