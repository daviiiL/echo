import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

export const fetchActiveTags = createAsyncThunk(
  "tags/fetchActiveTags",
  async (_, { rejectWithValue }) => {
    // not utilizing any arugment for now
    const response = await csrfFetch("/api/tags");
    const data = await response.json();
    if (response.stats >= 400) return rejectWithValue(data);
    else return data;
  }
);

export const tagSlice = createSlice({
  name: "tags",
  initialState: {
    allTags: [],
    selectedTags: [],
    articleTags: [],
    errors: null,
    fetchErrors: null,
  },
  reducers: {
    setHomepageTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    clearHomepageTags: (state) => {
      state.selectedTags = [];
    },
  },
  extraReducers: (builder) => [
    builder.addCase(fetchActiveTags.rejected, (state, action) => {
      //simple error logging for fetch errors
      state.fetchErrors = action.payload.errors;
    }),
    builder.addCase(fetchActiveTags.fulfilled, (state, action) => {
      state.allTags = action.payload.tags;
    }),
  ],
});

export const { setHomepageTags, clearHomePageTags } = tagSlice.actions;
export default tagSlice.reducer;
