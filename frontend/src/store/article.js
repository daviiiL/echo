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

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async (payload, { rejectWithValue }) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ ...payload }),
    };
    const response = await csrfFetch(`/api/articles/${payload.id}`, options);
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (articleId, { rejectWithValue }) => {
    const response = await csrfFetch(`/api/articles/${articleId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.status >= 400) rejectWithValue(data);
    return data;
  }
);

const replaceArrayItem = (arr, item) => {
  const itemIndex = arr.reduce((acc, el, ind) => {
    if (el.id === item.id) acc = ind;
    return acc;
  }, -1);
  if (itemIndex !== -1) arr[itemIndex] = item;
  return arr;
};

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
    clearArticleDetails: (state) => {
      state.articleDetails = {};
    },
    clearUserArticles: (state) => {
      state.userArticles = [];
    },
    clearArticleErrors: (state) => {
      state.errors = null;
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
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.articleDetails = action.payload.article;
      state.allArticles = replaceArrayItem(
        state.allArticles,
        action.payload.article
      );
      state.userArticles = replaceArrayItem(
        state.userArticles,
        action.payload.article
      );
      state.errors = null;
    });
    builder.addCase(updateArticle.rejected, (state, action) => {
      state.errors = action.payload.errors;
    });
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.errors = action.payload.errors;
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      const deletedId = parseInt(action.payload.deletedId);
      let index = state.allArticles.map((e) => e.id).indexOf(deletedId);
      state.allArticles.splice(index, 1);
      index = state.userArticles.map((e) => e.id).indexOf(deletedId);
      state.userArticles.splice(index, 1);
    });
  },
});

export const {
  getAllArticles,
  getArticleDetails,
  getUserArticles,
  clearArticleDetails,
  clearUserArticles,
  clearArticleErrors,
} = articleSlice.actions;
export default articleSlice.reducer;
