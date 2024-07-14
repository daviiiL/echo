import { createSlice } from "@reduxjs/toolkit";

export const articleSlice = createSlice({
  name: "articles",
  initialState: {
    allArticles: [],
    articleDetails: {},
  },
  reducers: {
    getAllArticles: (state, action) => {
      state.allArticles = action.payload.articles;
    },
    getArticleDetails: (state, action) => {
      state.articleDetails = action.payload.article;
    },
    postArticle: (state, action) => {
      state.allArticles = [...state.allArticles, action.payload.article];
    },
  },
});

export const { getAllArticles, getArticleDetails, postArticle } =
  articleSlice.actions;
export default articleSlice.reducer;
