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
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  }
);

export const articleSlice = createSlice({
  name: "articles",
  initialState: {
    allArticles: [],
    articleDetails: {},
    userArticles: [],
    errors: null,
  },
  reducers: {
    getAllArticles: (state, action) => {
      state.allArticles = action.payload.articles;
    },
    getArticleDetails: (state, action) => {
      state.articleDetails = action.payload.article;
    },
    getUserArticles: (state, action) => {
      state.userArticles = action.payload.articles;
    },
  },
  extraReducers: (builder) => {
    //extra reducers to handle certain async thunks that require specific error handling.
    builder.addCase(postArticle.rejected, (state, action) => {
      state.errors = action.payload.errors;
    });
    builder.addCase(postArticle.fulfilled, (state, action) => {
      state.articleDetails = action.payload.article;
      state.allArticles = [...state.allArticles, action.payload.article];
      state.userArticles = [...state.userArticles, action.payload.article];
      state.errors = null;
    });
  },
});

export const { getAllArticles, getArticleDetails, getUserArticles } =
  articleSlice.actions;
export default articleSlice.reducer;
