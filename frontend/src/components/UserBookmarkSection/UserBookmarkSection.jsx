import React from "react";
import { connect } from "react-redux";
import BookmarkCard from "./BookmarkCard";

class UserBookmarkSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bookmarkedArticles: null };
  }

  componentDidMount() {
    if (this.state.bookmarkedArticles === null) {
      const articles = this.props.allArticles.filter((e) =>
        this.props.bookmarkedArticleIds.includes(e.id)
      );
      this.setState({
        bookmarkedArticles: articles,
      });
    }
  }

  render() {
    if (!this.state.bookmarkedArticles) return null;
    return (
      <div>
        {this.state.bookmarkedArticles.map((e) => (
          <BookmarkCard key={e.id} e={e} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookmarkedArticleIds: state.articles?.bookmarkedArticleIds,
    allArticles: state.articles?.allArticles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const UserBookmarkSectionConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBookmarkSection);
UserBookmarkSectionConnected.displayName = "UserBookmarkSection";
export default UserBookmarkSectionConnected;
