import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

export const postArticle = createAsyncThunk(
  "articles/postArticle",
  async (payload, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify({ ...payload }),
    };
    const response = await csrfFetch("/api/articles", options);
    const data = await response.json();
    if (response.status >= 400) rejectWithValue(data);
    return data;
  },
);

export const articleSlice = createSlice({
  name: "articles",
  initialState: {
    allArticles: [],
    articleDetails: {},
    errors: null,
  },
  reducers: {
    getAllArticles: (state, action) => {
      state.allArticles = action.payload.articles;
    },
    getArticleDetails: (state, action) => {
      state.articleDetails = action.payload.article;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postArticle.rejected, async (state, action) => {
      state.errors = action.payload.errors;
    });
  },
});

export const { getAllArticles, getArticleDetails } = articleSlice.actions;
export default articleSlice.reducer;
