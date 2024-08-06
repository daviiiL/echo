import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";
import constructUrlQueryParams from "../utils/constructUrlQueryParams";
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

export const fetchArticleTags = createAsyncThunk(
  "tags/fetchArticleTags",
  async (articleId, { rejectWithValue }) => {
    const response = await csrfFetch(`/api/articles/${articleId}/tags`);
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  }
);

export const postArticletags = createAsyncThunk(
  "tags/postArticletags",
  async ({ articleId, tags }, { rejectWithValue }) => {
    const response = await csrfFetch(
      `/api/articles/${articleId}/tags${constructUrlQueryParams(tags, "tag")}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
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
    clearArticleTags: (state) => {
      state.articleTags = [];
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
    builder.addCase(postArticletags.rejected, (state, action) => {
      state.errors = action.payload.errors;
    }),
    builder.addCase(postArticletags.fulfilled, (state, action) => {
      state.errors = null;
      state.allTags = [...state.allTags, ...action.payload.tags];
    }),
    builder.addCase(fetchArticleTags.rejected, (state, action) => {
      state.fetchErrors = action.payload.errors;
    }),
    builder.addCase(fetchArticleTags.fulfilled, (state, action) => {
      //api returns an array of data instead of pojo
      state.articleTags = action.payload.tags?.map((e) => e.title);
    }),
  ],
});

export const { setHomepageTags, clearHomePageTags, clearArticleTags } =
  tagSlice.actions;
export default tagSlice.reducer;
