import { useState } from "react";
import "../../assets/components/CommentFormModal.css";
import store from "../../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  clearCommentErrors,
  postChildComment,
  postChildCommentModal,
  postRootCommentModal,
  postRootComment,
  updateComment,
  fetchCommentById,
} from "../../store/toolkitComment";
import { unwrapResult } from "@reduxjs/toolkit";
import { useModal } from "../../context/Modal";
export default function CommentForm({
  newComment = true,
  articleId,
  parentCommentId,
  isModal,
  authenticated = false,
}) {
  const [body, setBody] = useState("");
  const [loaded, setLoaded] = useState(false);
  const dbErrors = useSelector((state) => state.comments?.errors);
  const dbModalErrors = useSelector((state) => state.comments?.modalErrors);
  const comment = useSelector((state) => state.comments?.singleComment);
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();

  useEffect(() => {
    store.dispatch(clearCommentErrors()); //run clear errors stored in redux because diff instances share the same store
  }, []);

  useEffect(() => {
    if (!newComment) {
      if (!loaded) {
        store.dispatch(fetchCommentById(parentCommentId)).then(setLoaded(true));
      } else {
        setBody(comment.body);
      }
    } else {
      setBody("");
    }
  }, [loaded, newComment, comment, parentCommentId]);

  useEffect(() => {
    !isModal ? setErrors(dbErrors) : setErrors(dbModalErrors);
  }, [dbErrors, dbModalErrors, isModal]);

  const submitUpdatedComment = (e) => {
    e.preventDefault();
    if (!authenticated) return window.alert("Please login to continue.");
    const payload = {
      commentId: parentCommentId,
      body,
    };
    store
      .dispatch(updateComment(payload))
      .then(unwrapResult)
      .then((res) => {
        if (res && res.comment.id) closeModal();
      });
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!authenticated) return window.alert("Please login to continue.");
    //the presence of parent comment id determines
    //if creating a parent or child comment
    const newComment = {
      body,
      parent_article: articleId,
      parent_comment: parentCommentId,
    };

    if (!isModal) {
      parentCommentId
        ? store
            .dispatch(postChildComment(newComment))
            .then(unwrapResult)
            .then((res) => {
              if (res && res.comment.id) {
                closeModal();
              }
            })
        : store
            .dispatch(postRootComment(newComment))
            .then(unwrapResult)
            .then((res) => {
              if (res && res.comment.id) setBody("");
            });
    } else {
      parentCommentId
        ? store
            .dispatch(postChildCommentModal(newComment))
            .then(unwrapResult)
            .then((res) => {
              if (res && res.comment.id) {
                closeModal();
              }
            })
        : store
            .dispatch(postRootCommentModal(newComment))
            .then(unwrapResult)
            .then((res) => {
              if (res && res.comment.id) setBody("");
            });
    }
  };

  return (
    <form className="comment-form">
      {errors?.body && <p className="errors">{errors.body}</p>}
      <textarea
        type="text"
        placeholder={"type your comment here"}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <div id="comment-form-buttons">
        {newComment || <p>editing...</p>}
        {isModal && (
          <button id="cancel-button" onClick={closeModal}>
            Cancel
          </button>
        )}
        <button
          id="publish-button"
          type="submit"
          onClick={newComment ? submitComment : submitUpdatedComment}
        >
          Publish
        </button>
      </div>
    </form>
  );
}
