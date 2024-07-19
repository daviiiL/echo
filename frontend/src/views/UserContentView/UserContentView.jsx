import React from "react";
import { connect } from "react-redux";
import UserContentSection from "../../components/UserContentSection";
import { fetchCurrentUserArticles } from "../../services/articleService";
import { fetchCurrentUserComments } from "../../store/toolkitComment";
import "../../assets/view/UserContentView.css";
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
  componentDidMount() {
    if (!this.props.articles?.length) this.props.fetchCurrentUserArticles();
    if (!this.props.comments?.length) this.props.fetchCurrentUserComments();
  }

  render() {
    return (
      <div className="view-container">
        <div className="user-content-sections-container">
          <UserContentSection
            //this component uses the first kwarg param to determine whether its for articles or comments
            //thus, pass something in; even if its an empty array
            articles={this.props.articles ? this.props.articles : []}
          />
          <UserContentSection comments={this.props.comments} />
        </div>
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
  mapDispatchToProps,
)(UserContentView);
UserContentViewConnected.displayName = "UserContentView";
export default UserContentViewConnected;
