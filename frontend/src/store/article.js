import { csrfFetch } from "./csrf";

const GET_ALL_ARTICLES = "articles/get_all_articles";

const getArticlesWithoutFilter = (articles) => {
  return {
    type: GET_ALL_ARTICLES,
    payload: articles,
  };
};

export const GetAllArticlesWOFilter = () => async (dispatch) => {
  const response = await csrfFetch("/api/articles");
  if (response.ok) {
  }
};

export default function articleReducer(
  state = { allArticles: {}, articleDetails: {} },
  action,
) {
  switch (action.type) {
    case GET_ALL_ARTICLES: {
      const newState = { ...state };
      return newState;
    }
    default:
      return state;
  }
}
