import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

export const fetchCurrentUserComments = createAsyncThunk(
  "comments/fetchUserComments",
  async (_, { rejectWithValue }) => {
    const response = await csrfFetch("/api/comments/current");
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  },
);

export const fetchArticleComments = createAsyncThunk(
  "comments/fetchArticleComments",
  async (articleId, { rejectWithValue }) => {
    const response = await csrfFetch(`/api/articles/${articleId}/comments`);
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  },
);

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    userComments: [],
    articleComments: [],
    errors: null,
  },
  reducers: {
    clearCurrentUserComments: (state) => {
      state.userComments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUserComments.rejected, (state, action) => {
      //might need to readjust based on the API response format
      state.errors = action.payload.errors;
    });
    builder.addCase(fetchCurrentUserComments.fulfilled, (state, action) => {
      state.errors = null;
      state.userComments = action.payload.comments;
    });
    builder.addCase(fetchArticleComments.rejected, (state, action) => {
      state.errors = action.payload.errors;
    });
    builder.addCase(fetchArticleComments.fulfilled, (state, action) => {
      state.articleComments = action.payload.comments;
    });
  },
});

export const { clearCurrentUserComments } = commentSlice.actions;
export default commentSlice.reducer;
