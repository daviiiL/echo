import React from "react";
import { connect } from "react-redux";
import UserContentSection from "../../components/UserContentSection";
import UserBookmarkSection from "../../components/UserBookmarkSection";
import { fetchCurrentUserArticles } from "../../services/articleThunks";
import { fetchCurrentUserComments } from "../../store/comment";
import "../../assets/view/UserContentView.css";
import { Box, Tab, Tabs } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
const structureCommentsByArticle = (comments) => {
  //learning the importance of commenting my code
  //for better readability
  if (!comments.length) return {};
  // reducer should return this structure:
  // {
  //   articleId: {
  //     article: articleObj,
  //     comments : [commentObj1, commentObj2]
  //   },
  //   ...
  // }
  return comments.reduce((acc, el) => {
    const parentArticle = el.Article;
    if (!parentArticle) return acc;
    if (!(parentArticle.id in acc)) {
      acc[parentArticle.id] = {
        article: parentArticle,
        comments: [el],
      };
    } else {
      acc[parentArticle.id].comments.push(el);
    }
    return acc;
  }, {});
};

class UserContentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  handleTabChange = (e, tabIndex) => {
    this.setState({
      index: tabIndex,
    });
  };

  componentDidMount() {
    this.props.fetchCurrentUserArticles();
    this.props.fetchCurrentUserComments();
  }

  render() {
    return (
      <div className="view-container">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={this.state.index}
            onChange={this.handleTabChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#2196F3",
                border: "2.3px solid #2196F3",
                borderRadius: 5,
              },
            }}
            sx={{
              ".Mui-selected": { color: "#2196F3" },
            }}
          >
            <Tab
              label="articles"
              icon={<ArticleIcon />}
              iconPosition="end"
              disableRipple
              sx={{ minHeight: 1, height: 1 }}
            />
            <Tab
              label="comments"
              icon={<CommentIcon />}
              iconPosition="end"
              disableRipple
              sx={{ minHeight: 1, height: 1 }}
            />
            <Tab
              label="reading list"
              icon={<BookmarksIcon />}
              iconPosition="end"
              disableRipple
              sx={{ minHeight: 1, height: 1 }}
            />
          </Tabs>
        </Box>

        {this.state.index === 0 && (
          <UserContentSection
            //this component uses the first kwarg param to determine whether its for articles or comments
            //thus, pass something in; even if its an empty array
            articles={this.props.articles ? this.props.articles : []}
          />
        )}
        {this.state.index === 1 && (
          <UserContentSection comments={this.props.comments} />
        )}
        {this.state.index === 2 && <UserBookmarkSection />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles.userArticles,
  //sort comments by article
  comments: structureCommentsByArticle(state.comments.userComments),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentUserArticles: () => {
    dispatch(fetchCurrentUserArticles());
  },
  fetchCurrentUserComments: () => {
    dispatch(fetchCurrentUserComments());
  },
});

const UserContentViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContentView);
UserContentViewConnected.displayName = "UserContentView";
export default UserContentViewConnected;
