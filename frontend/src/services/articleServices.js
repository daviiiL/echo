import { createAsyncThunk } from "@reduxjs/toolkit";
import { csrfFetch } from "../store/csrf";
import store from "../store";
import { getAllArticles, getArticleDetails } from "../store/toolkitArticle";

export const fetchAllArticles = createAsyncThunk(
  "articles/fetchAllArticles",
  async () => {
    const response = await csrfFetch("/api/articles");
    const articles = await response.json();
    store.dispatch(getAllArticles(articles));
    return articles;
  },
);

export const fetchArticleDetails = createAsyncThunk(
  "articles/fetchArticleDetails",
  async (articleId) => {
    const response = await csrfFetch(`/api/articles/${articleId}`);
    const article = await response.json();
    store.dispatch(getArticleDetails(article));
    return article;
  },
);
