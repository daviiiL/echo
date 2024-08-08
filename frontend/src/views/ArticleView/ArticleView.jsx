import { IconButton, Typography } from "@mui/material";
import parse from "html-react-parser";
import React from "react";
import {
  MdBookmarkAdd,
  MdBookmarkAdded,
  MdComment,
  MdThumbUpAlt,
  MdThumbUpOffAlt,
} from "react-icons/md";
import { connect } from "react-redux";
import "../../assets/view/ArticleView.css";
import ArticleCommentsSectionConnected from "../../components/ArticleCommentSection/ArticleCommentSection";
import AuthorCard from "../../components/AuthorCard";
import notify from "../../components/Toaster/notify";
import { fetchArticleDetails } from "../../services/articleThunks";
import {
  likeArticle,
  subscribeToArticle,
  unlikeArticle,
  unsubscribeFromArticle,
} from "../../store/article";

export class ArticleView extends React.Component {
  constructor(props) {
    super(props);
    this.url = window.location.href.split("/");
    //define the array first for better time and space complexities than a one liner
    this.articleId = this.url[this.url.length - 1];
    this.state = {
      loaded: false,
      subscribed: null,
      liked: null,
    };
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

  componentDidUpdate(prevProps) {
    if (
      (this.props.sessionUserId &&
        prevProps.sessionUserId !== this.props.sessionUserId) ||
      prevProps.bookmarkedArticleIds !== this.props.bookmarkedArticleIds
    ) {
      const liked = this.props.articleDetails.Likes.some(
        (e) => e.user_id === this.props.sessionUserId
      );
      const subscribed = this.props.bookmarkedArticleIds.includes(
        parseInt(this.articleId)
      );
      this.setState({ liked: liked, subscribed: subscribed });
    }
    if (
      !this.state.loaded &&
      this.props.articleDetails.Likes?.length &&
      this.props.bookmarkedArticleIds
    ) {
      const liked = this.props.articleDetails.Likes.some(
        (e) => e.user_id === this.props.sessionUserId
      );
      const subscribed = this.props.bookmarkedArticleIds.includes(
        parseInt(this.articleId)
      );
      this.setState({ liked: liked, loaded: true, subscribed });
    }
  }

  handleLike = () => {
    if (!this.props.sessionUserId)
      return notify({
        message: "Please login to like",
        color: "error",
      });
    const newLikedStatus = !this.state.liked;
    //make thunk dispatch as callback for setState
    this.setState({ ...this.state, liked: newLikedStatus }, () => {
      return newLikedStatus
        ? this.props.likeArticle(this.articleId)
        : this.props.unlikeArticle({
            articleId: this.articleId,
            userId: this.props.sessionUserId,
          });
    });
  };

  handleSubscribe = () => {
    if (!this.props.sessionUserId)
      return notify({
        message: "Please login to subscribe",
        color: "error",
      });
    const newSubscribeState = !this.state.subscribed;
    this.setState({ subscribed: newSubscribeState }, () => {
      return newSubscribeState
        ? this.props.subscribeToArticle(this.articleId)
        : this.props.unsubscribeFromArticle(this.articleId);
    });
    return notify({
      message: `article ${
        !this.state.subscribed ? "saved" : "removed from reading list"
      }`,
      position: "top-right",
      color: "green",
      icon: "🎉",
    });
  };

  render() {
    return (
      <div className="view-container flex-col" id="article-details">
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
              sessionUserId={this.props.sessionUserId}
            />
          </div>
          <div id="article-interactions">
            <div>
              <div>
                <IconButton
                  sx={{ padding: 0 }}
                  aria-label="like"
                  color={this.state.liked ? "success" : "primary"}
                  onClick={this.handleLike}
                  key={this.sessionUserId}
                >
                  {this.state.liked ? (
                    <MdThumbUpAlt size={25} />
                  ) : (
                    <MdThumbUpOffAlt size={25} />
                  )}
                </IconButton>
                <p className="interact select-none text-gray-500">
                  {this.props.articleDetails.likes_count}
                </p>
              </div>
              <div>
                <MdComment size={25} className="interact" color="grey" />
                <p className="select-none text-gray-500">
                  {/*TODO: probably consider removing fetching comments in article backend route to lighten server load */}
                  {/* {this.props.articleDetails?.Comments?.length} NOTE: replaced by comment store article comment length*/}
                  {this.props.commentsLength}
                </p>
              </div>
              {!this.props.sessionUserId && (
                <Typography
                  variant="caption"
                  sx={{ color: "grey" }}
                >{`👉  login to like or save this article`}</Typography>
              )}
            </div>
            {this.props.articleDetails.author_id !==
              this.props.sessionUserId && (
              <div>
                <IconButton
                  color={this.state.subscribed ? "success" : "primary"}
                  onClick={this.handleSubscribe}
                  key={this.state.subscribed}
                >
                  {this.state.subscribed ? (
                    <MdBookmarkAdded size={25} />
                  ) : (
                    <MdBookmarkAdd size={25} />
                  )}
                </IconButton>
              </div>
            )}
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
  sessionUserId: state.session.user?.id,
  bookmarkedArticleIds: state.articles?.bookmarkedArticleIds,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticleDetails: (articleId) => {
      dispatch(fetchArticleDetails(parseInt(articleId)));
    },
    likeArticle: (articleId) => {
      dispatch(likeArticle(parseInt(articleId)));
    },
    unlikeArticle: (payload) => {
      dispatch(unlikeArticle(payload));
    },
    subscribeToArticle: (articleId) => {
      dispatch(subscribeToArticle(articleId));
    },
    unsubscribeFromArticle: (articleId) => {
      dispatch(unsubscribeFromArticle(articleId));
    },
  };
};

const ArticleViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleView);
ArticleViewConnected.displayName = "ArticleView";
export default ArticleViewConnected;
