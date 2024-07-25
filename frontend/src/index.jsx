import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store";
import { createTheme } from "@mui/material/styles";

import { ModalProvider } from "./context/Modal";

import "@fontsource/roboto";
import { ThemeProvider } from "styled-components";
import { restoreCSRF } from "./store/csrf";
if (import.meta.env.MODE !== "production") {
  restoreCSRF();

  /*   window.sessionActions = sessionActions; */
}
const materialTheme = createTheme({
  palette: {
    background: {
      primary: "#e2e8f0",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <ThemeProvider theme={materialTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </ModalProvider>
  </React.StrictMode>,
);
