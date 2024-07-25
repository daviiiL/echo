import store from "../store";
import { clearUserCommentsByArticleId } from "../store/comment";

export const clearDeletedArticleComments = (articleId) => {
  store.dispatch(clearUserCommentsByArticleId(articleId));
};
