import { Outlet } from "react-router-dom";
import NavigationConnected from "../../components/Navigation";
import { Modal } from "../../context/Modal";
import store from "../../store";
import {
  fetchAllArticles,
  fetchCurrentUserArticles,
} from "../../services/articleThunks";
import { restoreSession } from "../../services/sessionThunks";
import "./Layout.css";
import "../../assets/view/index.css";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchCurrentUserComments } from "../../store/comment";
import { useSelector } from "react-redux";
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
      .then(unwrapResult)
      .then((res) => {
        if (res.user?.id) {
          store.dispatch(fetchCurrentUserArticles());
          store.dispatch(fetchCurrentUserComments());
        }
      });
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
