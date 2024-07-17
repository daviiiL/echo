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
export default function Layout() {
  useEffect(() => {
    store.dispatch(fetchAllArticles());
    store.dispatch(restoreSession());
    //TODO: maybe fetch current user data only if authenticated
    store.dispatch(fetchCurrentUserArticles());
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
