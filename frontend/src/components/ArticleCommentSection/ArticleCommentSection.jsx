import React from "react";
import { connect } from "react-redux";
import { fetchArticleComments } from "../../store/toolkitComment";

export class ArticleCommentsSection extends React.Component {
  componentDidMount() {
    this.props.fetchArticleComments(this.props.articleId);
  }

  render() {
    return (
      <div>
        <p>ArticleCommentsSection</p>
      </div>
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
