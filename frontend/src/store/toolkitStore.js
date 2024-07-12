import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { sessionSlice } from "./toolkitSession";

const rootReducer = combineSlices(sessionSlice);

export const store = configureStore({
  reducer: rootReducer,
});
