import { getArticleDetails, getAllArticles } from "../store/toolkitArticle";
import { csrfFetch } from "../store/csrf";
import store from "../store";

export const articleService = {
  async fetchAllArticles() {
    const response = await csrfFetch("/api/articles");
    if (response.ok) {
      const articles = await response.json();
      store.dispatch(getAllArticles);
      return articles;
    } else {
      const data = await response.json();
      console.log(data);
      throw new Error("Fetch All Articles Failed");
    }
  },
  async fetchArticleDetails(articleId) {
    const response = await csrfFetch(`/api/articles/${articleId}`);
    if (response.ok) {
      const article = await response.json();
      store.dispatch(getArticleDetails);
      return article;
    } else {
      const data = await response.json();
      console.log(data);
      throw new Error("Fetch All Articles Failed");
    }
  },
};
