import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { sessionSlice } from "./toolkitSession";
import { articleSlice } from "./toolkitArticle";
const rootReducer = combineSlices(sessionSlice, articleSlice);

export const store = configureStore({
  reducer: rootReducer,
});
