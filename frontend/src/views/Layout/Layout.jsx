import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "../../assets/view/index.css";
import NavigationConnected from "../../components/Navigation";
import Notifier from "../../components/Toaster";
import { Modal } from "../../context/Modal";
import {
  fetchAllArticles,
  fetchCurrentUserArticles,
} from "../../services/articleThunks";
import { restoreSession } from "../../services/sessionThunks";
import store from "../../store";
import { fetchCurrentUserSubscriptions } from "../../store/article";
import { fetchCurrentUserComments } from "../../store/comment";
import "./Layout.css";

export default function Layout() {
  //get user selected tags from state, which is updated by the tag bar
  const selectedTags = useSelector((state) => state.tags.selectedTags);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(selectedTags);
    //whenever user selected tags change, this useEffect sets state
  }, [selectedTags]);

  useEffect(() => {
    store.dispatch(fetchAllArticles(tags));
    //whenever tag state changes, this useEffect dispatches to fetch articles by tag names
  }, [tags]);

  useEffect(() => {
    store.dispatch(fetchAllArticles(tags));
    store
      .dispatch(restoreSession())
      // .then(unwrapResult)
      .then(() => {
        // if (res.user?.id) {
        store.dispatch(fetchCurrentUserArticles());
        store.dispatch(fetchCurrentUserComments());
        store.dispatch(fetchCurrentUserSubscriptions());
        // }
      });
  });
  return (
    <div id="main">
      <Notifier />
      <Modal />
      <NavigationConnected />
      <div id="main-view-container">
        <div id="main-view-spacer"></div>
        <Outlet />
      </div>
    </div>
  );
}
