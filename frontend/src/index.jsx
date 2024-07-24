import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store";

import { ModalProvider } from "./context/Modal";
// import { MenuModalProvider } from "./context/MenuModal";
import "@fontsource/roboto";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      main: "#e2e8f0",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ModalProvider>
        {/* <MenuModalProvider> */}
        <Provider store={store}>
          <App />
        </Provider>
        {/* </MenuModalProvider> */}
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
