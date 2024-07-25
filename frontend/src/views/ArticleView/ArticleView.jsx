import React from "react";
import { connect } from "react-redux";
import { fetchArticleDetails } from "../../services/articleThunks";
// import { IoMdArrowBack } from "react-icons/io";
import {
  PiHandsClappingThin,
  PiChatCircleTextThin,
  PiBookmarkThin,
} from "react-icons/pi";
import parse from "html-react-parser";
import "../../assets/view/ArticleView.css";
import AuthorCard from "../../components/AuthorCard";
import ArticleCommentsSectionConnected from "../../components/ArticleCommentSection/ArticleCommentSection";

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
      <div className="view-container flex-col" id="article-details">
        {/*  <IoMdArrowBack
          style={{ marginTop: "3px", marginRight: "10px" }}
          size={30}
          onClick={() => this.props.navigate(-1)}
        /> */}
        <div id="article-content">
          <div id="article-details-title-bar">
            <p className="header text-4xl">{this.props.articleDetails.title}</p>
            <p className="subheader text-2xl font-light">
              {this.props.articleDetails.sub_title}
            </p>
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
                  {/* probably consider removing fetching comments in article backend route to lighten server load */}
                  {/* {this.props.articleDetails?.Comments?.length} NOTE: replaced by comment store article comment length*/}
                  {this.props.commentsLength}
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
            <div className="article-text">
              {this.props.articleDetails.body &&
                parse(this.props.articleDetails?.body, {})}
            </div>
          </div>
        </div>

        <div id="comments-content">
          <ArticleCommentsSectionConnected articleId={this.articleId} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articleDetails: state.articles?.articleDetails,
  commentsLength: state.comments?.articleComments?.length,
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
