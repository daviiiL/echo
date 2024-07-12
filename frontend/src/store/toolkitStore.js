import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { sessionSlice } from "./toolkitSession";
import { articleSlice } from "./toolkitArticle";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
const rootReducer = combineSlices(sessionSlice, articleSlice);

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export const store = configureStore(
  {
    reducer: rootReducer,
  },
  applyMiddleware(thunk, enhancer),
);
