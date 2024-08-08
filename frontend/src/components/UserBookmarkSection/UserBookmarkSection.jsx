import React from "react";
import { connect } from "react-redux";
import BookmarkCard from "./BookmarkCard";

class UserBookmarkSection extends React.Component {
  render() {
    return (
      <div>
        {this.props.allArticles.map((e) => (
          <BookmarkCard key={e.id} e={e} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allArticles: state.articles?.allArticles.filter((e) =>
      state.articles.bookmarkedArticleIds.includes(e.id),
    ),
  };
};

const UserBookmarkSectionConnected =
  connect(mapStateToProps)(UserBookmarkSection);
UserBookmarkSectionConnected.displayName = "UserBookmarkSection";
export default UserBookmarkSectionConnected;
