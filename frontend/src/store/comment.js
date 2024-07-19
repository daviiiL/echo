import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

export const fetchCurrentUserComments = createAsyncThunk(
  "comments/fetchCurrentUserComments",
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
export const postRootCommentModal = createAsyncThunk(
  "comments/postRootCommentModal",
  async (payload, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        ...payload,
      }),
    };
    const response = await csrfFetch(
      `/api/articles/${payload.parent_article}/comments`,
      options,
    );
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  },
);

export const postChildCommentModal = createAsyncThunk(
  "comments/postChildCommentModal",
  async (payload, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify({ ...payload }),
    };
    const response = await csrfFetch(
      `/api/articles/${payload.parent_article}/comments/${payload.parent_comment}`,
      options,
    );
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  },
);

export const postRootComment = createAsyncThunk(
  "comments/postRootComment",
  async (payload, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        ...payload,
      }),
    };
    const response = await csrfFetch(
      `/api/articles/${payload.parent_article}/comments`,
      options,
    );
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  },
);

export const postChildComment = createAsyncThunk(
  "comments/postChildComment",
  async (payload, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify({ ...payload }),
    };
    const response = await csrfFetch(
      `/api/articles/${payload.parent_article}/comments/${payload.parent_comment}`,
      options,
    );
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  },
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (payload, { rejectWithValue }) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ ...payload }),
    };
    const response = await csrfFetch(
      `/api/comments/${payload.commentId}`,
      options,
    );
    const data = await response.json();
    if (response.status >= 400) return rejectWithValue(data);
    return data;
  },
);

export const fetchCommentById = createAsyncThunk(
  "comments/fetchCommentById",
  async (commentId) => {
    const response = await csrfFetch(`/api/comments/${commentId}`);
    const data = await response.json();
    return data;
  },
);
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
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
    singleComment: {},
    errors: null,
    modalErrors: null,
  },
  reducers: {
    clearCurrentUserComments: (state) => {
      state.userComments = [];
    },
    clearCommentErrors: (state) => {
      state.errors = null;
      state.modalErrors = null;
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
    builder.addCase(postRootComment.rejected, (state, action) => {
      state.errors = action.payload.errors;
    });
    builder.addCase(postRootComment.fulfilled, (state, action) => {
      state.articleComments = [
        ...state.articleComments,
        action.payload.comment,
      ];
      state.userComments = [...state.userComments, action.payload.comment];
      state.errors = null;
    });
    builder.addCase(postChildComment.rejected, (state, action) => {
      console.log(action.payload);
      state.errors = action.payload?.errors;
    });
    builder.addCase(postChildComment.fulfilled, (state, action) => {
      state.articleComments = [
        ...state.articleComments,
        action.payload.comment,
      ];
      state.userComments = [...state.userComments, action.payload.comment];
      state.errors = null;
    });
    builder.addCase(postRootCommentModal.rejected, (state, action) => {
      state.modalErrors = action.payload.errors;
    });
    builder.addCase(postRootCommentModal.fulfilled, (state, action) => {
      state.articleComments = [
        ...state.articleComments,
        action.payload.comment,
      ];
      state.userComments = [...state.userComments, action.payload.comment];
      state.modalErrors = null;
    });
    builder.addCase(postChildCommentModal.rejected, (state, action) => {
      state.modalErrors = action.payload.errors;
    });
    builder.addCase(postChildCommentModal.fulfilled, (state, action) => {
      state.articleComments = [
        ...state.articleComments,
        action.payload.comment,
      ];
      state.userComments = [...state.userComments, action.payload.comment];
      state.modalErrors = null;
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.modalErrors = action.payload?.errors;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      const updatedComment = action.payload.comment;
      const userIndex = state.userComments
        .map((e) => e.id)
        .indexOf(updatedComment.id);
      if (userIndex > -1) {
        state.userComments[userIndex].body = updatedComment.body;
      }
      const articleIndex = state.articleComments
        .map((e) => e.id)
        .indexOf(updatedComment.id);
      if (articleIndex > -1) {
        state.articleComments[articleIndex].body = updatedComment.body;
      }
    });

    builder.addCase(fetchCommentById.fulfilled, (state, action) => {
      state.singleComment = action.payload.comment;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const commentId = action.meta.arg;
      let comment = state.articleComments.find(
        (comment) => comment.id === commentId,
      );

      if (comment) {
        comment.body = "This comment has been deleted";
        comment.User = null;
        comment.commenter_id = null;
        comment.upvote = null;
        comment.downvote = null;
        comment.likes_count = 0;
      }

      comment = state.userComments.find((comment) => comment.id === commentId);
      if (comment) {
        comment.body = "This comment has been deleted";
        comment.User = null;
        comment.commenter_id = null;
        comment.upvote = null;
        comment.downvote = null;
        comment.likes_count = 0;
      }
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.errors = action.payload.errors;
    });
  },
});

export const { clearCurrentUserComments, clearCommentErrors } =
  commentSlice.actions;
export default commentSlice.reducer;
