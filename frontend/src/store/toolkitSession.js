import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  // extraReducers: (builder) => {},
});

export const { loginSuccess, logoutSuccess } = sessionSlice.actions;
export default sessionSlice.reducer;
