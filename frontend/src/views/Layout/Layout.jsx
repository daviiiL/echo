import { Outlet } from "react-router-dom";
import NavigationConnected from "../../components/Navigation";
import { Modal } from "../../context/Modal";
import store from "../../store";
import {
  fetchAllArticles,
  fetchCurrentUserArticles,
} from "../../services/articleService";
import { restoreSession } from "../../services/sessionService";
import "./Layout.css";
import "../../assets/view/index.css";
import { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchCurrentUserComments } from "../../store/toolkitComment";
export default function Layout() {
  useEffect(() => {
    store.dispatch(fetchAllArticles());
    store
      .dispatch(restoreSession())
      .then(unwrapResult)
      .then((res) => {
        if (res.user?.id) {
          store.dispatch(fetchCurrentUserArticles());
          store.dispatch(fetchCurrentUserComments());
        }
      });
    //TODO: maybe fetch current user data only if authenticated
  });
  return (
    <div id="main">
      <Modal />
      <NavigationConnected />
      <div id="main-view-container">
        <div id="main-view-spacer"></div>
        <Outlet />
      </div>
    </div>
  );
}
