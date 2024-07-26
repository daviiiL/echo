import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

//need to dispatch actions when using
export const login = createAsyncThunk(
  "session/login",
  async ({ credential, password }, { rejectWithValue }) => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });
    const data = await response.json();
    if (response.status >= 400) {
      return rejectWithValue(data);
    } else return data;
  },
);
//need to dispatch action when using
export const signup = createAsyncThunk(
  "session/signup",
  async (payload, { rejectWithValue }) => {
    const { email, username, firstName, lastName, password } = payload;
    const options = {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      }),
    };
    const response = await csrfFetch("/api/users", options);
    // throw new Error("test");
    const data = await response.json();
    if (response.status >= 400) {
      return rejectWithValue(data);
    } else return data;
  },
);

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    user: null,
    isAuthenticated: false,
    errors: null,
  },
  reducers: {
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.errors = null;
    },
    restoreSessionSuccess: (state, action) => {
      state.user = "user" in action.payload ? action.payload.user : null;
      state.isAuthenticated = state.user && true;
      state.errors = null;
    },
    clearSessionErrors: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state) => {
      state.user = null;
      state.errors = null;
      state.isAuthenticated = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.errors = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.errors = action.payload?.errors ? action.payload.errors : null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.errors = null;
    });
  },
});

export const { logoutSuccess, restoreSessionSuccess, clearSessionErrors } =
  sessionSlice.actions;
export default sessionSlice.reducer;
