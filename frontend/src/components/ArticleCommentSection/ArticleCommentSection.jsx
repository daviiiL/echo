import React from "react";
import { connect } from "react-redux";
import { fetchArticleComments } from "../../store/toolkitComment";
import CommentCard from "../CommentCard/CommentCard";
import "../../assets/components/ArticleCommentSection.css";
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
        {this.props.comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments?.articleComments,
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
