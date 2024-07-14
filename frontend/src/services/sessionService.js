import {
  // loginSuccess,
  logoutSuccess,
  restoreSessionSuccess,
} from "../store/toolkitSession";
import { csrfFetch } from "../store/csrf";
import store from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk(
  "session/logout",
  async (_, { rejectWithValue }) => {
    const response = await csrfFetch("/api/session", {
      method: "DELETE",
    });

    if (response.ok) {
      const data = response.json();
      store.dispatch(logoutSuccess());
      return data;
    }
    let errorMessages;
    if (response.status < 500) {
      errorMessages = await response.json();
    } else
      errorMessages = {
        server: "Something went wrong. Please try again later!",
      };
    rejectWithValue(errorMessages);
  },
);

export const restoreSession = createAsyncThunk(
  "session/restoreSession",
  async () => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    if (response.status >= 400)
      return store.dispatch(restoreSessionSuccess({ user: null }));
    store.dispatch(restoreSessionSuccess(data));
  },
);
