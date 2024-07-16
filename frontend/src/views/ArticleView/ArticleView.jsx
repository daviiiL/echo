import React from "react";
import { connect } from "react-redux";
import { fetchArticleDetails } from "../../services/articleService";
import { IoMdArrowBack } from "react-icons/io";
import {
  PiHandsClappingThin,
  PiChatCircleTextThin,
  PiBookmarkThin,
} from "react-icons/pi";
import parse from "html-react-parser";
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
        {/*  <IoMdArrowBack
          style={{ marginTop: "3px", marginRight: "10px" }}
          size={30}
          onClick={() => this.props.navigate(-1)}
        /> */}
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
            <div>
              <div>
                <PiHandsClappingThin size={25} className="interact" />
                <p className="interact">
                  {this.props.articleDetails.likes_count}
                </p>
              </div>
              <div>
                <PiChatCircleTextThin size={25} className="interact" />
                <p className="interact">
                  {this.props.articleDetails?.Comments?.length}
                </p>
              </div>
            </div>
            <div>
              <PiBookmarkThin
                size={25}
                onClick={() => window.alert("Bookmarks feature coming soon")}
              />
            </div>
          </div>
          <div className="article-body">
            {this.props.articleDetails?.preview_image_url && (
              <div className="article-image-container">
                <img
                  src={this.props.articleDetails?.preview_image_url}
                  alt={this.props.articleDetails?.title}
                />
              </div>
            )}
          </div>
          <div>
            {this.props.articleDetails.body &&
              parse(this.props.articleDetails?.body)}
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
  mapDispatchToProps
)(ArticleView);
ArticleViewConnected.displayName = "ArticleView";
export default ArticleViewConnected;
