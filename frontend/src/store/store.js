import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { sessionSlice } from "./session";
import { articleSlice } from "./article";
import { commentSlice } from "./comment";
import { tagSlice } from "./tag";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineSlices(
  sessionSlice,
  articleSlice,
  commentSlice,
  tagSlice
);

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
  applyMiddleware(thunk, enhancer)
);
