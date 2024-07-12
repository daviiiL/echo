import React from "react";
import { connect } from "react-redux";
import { fetchArticleDetails } from "../../services/articleServices";
import { IoMdArrowBack } from "react-icons/io";

import "../../assets/view/ArticleView.css";
export class ArticleView extends React.Component {
  constructor(props) {
    super(props);
    this.url = window.location.href.split("/");
    //define the array first for better time and space complexities than a one liner
    this.articleId = this.url[this.url.length - 1];
    this.articleDetails = this.props.articles?.articleDetails;
  }

  componentDidMount() {
    const { fetchArticleDetails } = this.props;
    fetchArticleDetails(this.articleId);
  }

  render() {
    return (
      <div className="view-container" id="article-details">
        ArticleView Component
        <p>{this.articleId}</p>
        <div className="article-details-title-bar">
          <IoMdArrowBack size={30} onClick={() => this.props.navigate("/")} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articleDetails: state.articles?.articleDetails,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticleDetails: (articleId) => {
      dispatch(fetchArticleDetails(parseInt(articleId)));
    },
  };
};

const ArticleViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleView);
ArticleViewConnected.displayName = "ArticleView";
export default ArticleViewConnected;
