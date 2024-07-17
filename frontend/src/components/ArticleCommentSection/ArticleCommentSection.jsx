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

  render() {
    return (
      <>
        <p className="comment-section-header">
          {`${this.props.comments?.length} Comments`}
        </p>
        <div className="comment-form-container">
          <CommentForm articleId={this.props.articleId} />
        </div>
        {this.props.comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            sessionUser={this.props.sessionUser}
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
