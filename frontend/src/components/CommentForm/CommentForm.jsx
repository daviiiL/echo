import { useState } from "react";
import "../../assets/components/CommentFormModal.css";
import store from "../../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { postChildComment, postRootComment } from "../../store/toolkitComment";
import { unwrapResult } from "@reduxjs/toolkit";
export default function CommentForm({
  newComment = true,
  articleId,
  parentCommentId = null,
}) {
  const [body, setBody] = useState("");
  const [loaded, setLoaded] = useState(false);

  const dbErrors = useSelector((state) => state.comments?.errors);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!newComment) {
      if (!loaded) {
        //pass: dispatch prepopuation thunk here
      } else {
        //set body to state
      }
    } else {
      setBody("");
    }
  }, [loaded, newComment]);

  useEffect(() => {
    setErrors(dbErrors);
  }, [dbErrors]);

  const updateComment = (e) => {
    e.preventDefault();
    window.alert("clicked update");
  };

  const submitComment = (e) => {
    e.preventDefault();

    //the presence of parent comment id determines
    //if creating a parent or child comment
    const newComment = {
      body,
      parent_article: articleId,
      parent_comment: parentCommentId,
    };
    // console.log(newComment);
    parentCommentId
      ? store.dispatch(postChildComment(newComment))
      : store
          .dispatch(postRootComment(newComment))
          .then(unwrapResult)
          .then((res) => {
            if (res && res.comment.id) setBody("");
          });
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
      <button
        id="publish-button"
        type="submit"
        onClick={newComment ? submitComment : updateComment}
      >
        Publish
      </button>
    </form>
  );
}
