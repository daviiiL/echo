import React from "react";
import { connect } from "react-redux";
import { fetchArticleComments } from "../../store/toolkitComment";
import CommentCard from "../CommentCard/CommentCard";
import "../../assets/components/ArticleCommentSection.css";
import CommentForm from "../CommentForm/CommentForm";
export class ArticleCommentsSection extends React.Component {
  componentDidMount() {
    this.props.fetchArticleComments(this.props.articleId);
  }

  sortCommentsPreorder = (comments) => {
    const result = [];
    const map = {};
    for (const comment of comments) {
      map[comment.id] = { ...comment, children: [] };
    }
    for (const comment of comments) {
      if (comment.parent_comment !== null)
        map[comment.parent_comment].children.push(map[comment.id]);
    }

    function preorderTraversal(comment) {
      result.push(comment);
      for (const child of comment.children) preorderTraversal(child);
    }

    for (const comment of comments) {
      if (comment.parent_comment === null) preorderTraversal(map[comment.id]);
    }
    return result;
  };

  flattenComments(comments) {
    const sortedComments = this.sortCommentsPreorder(comments);
    const flattened = [];

    function flatten(comment) {
      flattened.push(comment);
      for (const child of comment.children) flatten(child);
    }

    for (const comment of sortedComments) {
      if (comment.parent_comment === null) flatten(comment);
    }
    return flattened;
  }

  render() {
    return (
      <>
        <p className="comment-section-header">
          {`${this.props.comments?.length} Comments`}
        </p>
        <div className="comment-form-container">
          <CommentForm
            articleId={this.props.articleId}
            authenticated={this.props.sessionUser !== null}
          />
        </div>
        {this.flattenComments(this.props.comments).map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            sessionUserId={this.props.sessionUser?.id}
          />
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments?.articleComments,
  sessionUser: state.session?.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticleComments: (articleId) => {
      dispatch(fetchArticleComments(articleId));
    },
  };
};

const ArticleCommentsSectionConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleCommentsSection);
ArticleCommentsSectionConnected.displayName = "ArticleView";
export default ArticleCommentsSectionConnected;
