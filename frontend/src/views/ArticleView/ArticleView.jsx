import React from "react";
import { connect } from "react-redux";
import { fetchArticleDetails } from "../../services/articleService";
import { IoMdArrowBack } from "react-icons/io";
import { PiHandsClappingThin } from "react-icons/pi";

import "../../assets/view/ArticleView.css";
import AuthorCard from "../../components/AuthorCard";
export class ArticleView extends React.Component {
  constructor(props) {
    super(props);
    this.url = window.location.href.split("/");
    //define the array first for better time and space complexities than a one liner
    this.articleId = this.url[this.url.length - 1];
  }
  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  componentDidMount() {
    const { fetchArticleDetails } = this.props;
    fetchArticleDetails(this.articleId);
  }

  render() {
    return (
      <div className="view-container" id="article-details">
        <IoMdArrowBack
          style={{ marginTop: "3px", marginRight: "10px" }}
          size={30}
          onClick={() => this.props.navigate("/")}
        />
        <div id="article-content">
          <div id="article-details-title-bar">
            <p className="header">{this.props.articleDetails.title}</p>
            <p className="subheader">{this.props.articleDetails.sub_title}</p>
            <AuthorCard
              owner={this.props.articleDetails.Author}
              readtime={this.props.articleDetails.body}
              publishDate={this.formatDate(this.props.articleDetails.createdAt)}
            />
          </div>
          <div id="article-interactions">
            <PiHandsClappingThin />
          </div>
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
