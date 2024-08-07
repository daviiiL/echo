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
  },
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
  },
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (articleId, { rejectWithValue }) => {
    const response = await csrfFetch(`/api/articles/${articleId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  },
);

export const likeArticle = createAsyncThunk(
  "articles/likeArticle",
  async (articleId, { rejectWithValue }) => {
    const response = await csrfFetch(`/api/articles/${articleId}/likes`, {
      method: "POST",
    });
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  },
);

export const unlikeArticle = createAsyncThunk(
  "articles/unlikeArticle",
  async (payload, { rejectWithValue }) => {
    const { articleId, userId } = payload;
    const response = await csrfFetch(`/api/articles/${articleId}/likes`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return userId;
  },
);

export const subscribeToArticle = createAsyncThunk(
  "articles/subscribeToArticle",
  async (articleId, { rejectWithValue }) => {
    const response = await csrfFetch(`/api/articles/${articleId}/subscribe`, {
      method: "POST",
    });
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  },
);

export const unsubscribeFromArticle = createAsyncThunk(
  "articles/unsubscribeFromArticle",
  async (articleId, { rejectWithValue }) => {
    const response = await csrfFetch(`/api/articles/${articleId}/subscribe`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  },
);

export const fetchCurrentUserSubscriptions = createAsyncThunk(
  "articles/getUserSubscriptions",
  async () => {
    const response = await csrfFetch(`/api/articles/current/subscriptions`);
    const data = await response.json();
    // if (response.status >= 400) return rejectWithValue(data);
    return data;
  },
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
    bookmarkedArticleIds: [],
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
    clearUserSubscriptions: (state) => {
      state.bookmarkedArticleIds = [];
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
        action.payload.article,
      );
      state.userArticles = replaceArrayItem(
        state.userArticles,
        action.payload.article,
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
    builder.addCase(likeArticle.rejected, (state) => {
      state.errors = "Something went wrong";
    });
    builder.addCase(likeArticle.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.articleDetails.Likes = [
        ...state.articleDetails.Likes,
        { user_id: action.payload.user_id },
      ];
      state.articleDetails.likes_count += 1;
    });
    builder.addCase(unlikeArticle.fulfilled, (state, action) => {
      state.articleDetails.Likes = state.articleDetails.Likes.filter(
        (e) => !(e.user_id == action.payload),
      );
      state.articleDetails.likes_count -= 1;
    });
    builder.addCase(subscribeToArticle.fulfilled, (state, action) => {
      state.bookmarkedArticleIds.push(
        parseInt(action.payload.bookmark.article_id),
      );
    });
    builder.addCase(unsubscribeFromArticle.fulfilled, (state, action) => {
      state.bookmarkedArticleIds = state.bookmarkedArticleIds.filter(
        (e) => e !== parseInt(action.payload.bookmark.article_id),
      );
    });
    builder.addCase(
      fetchCurrentUserSubscriptions.fulfilled,
      (state, action) => {
        state.bookmarkedArticleIds = action.payload.subscribed_articles.map(
          (e) => e.id,
        );
      },
    );
  },
});

export const {
  getAllArticles,
  getArticleDetails,
  getUserArticles,
  clearArticleDetails,
  clearUserArticles,
  clearArticleErrors,
  clearUserSubscriptions,
} = articleSlice.actions;
export default articleSlice.reducer;
