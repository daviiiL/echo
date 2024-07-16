import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store";

import { restoreCSRF, csrfFetch } from "./store/csrf";
import { ModalProvider } from "./context/Modal";
// import { MenuModalProvider } from "./context/MenuModal";
import "@fontsource/roboto";

if (import.meta.env.MODE !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  /*   window.sessionActions = sessionActions; */
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      {/* <MenuModalProvider> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </MenuModalProvider> */}
    </ModalProvider>
  </React.StrictMode>,
);
