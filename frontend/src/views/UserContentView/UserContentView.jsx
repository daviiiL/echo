import React from "react";
import { connect } from "react-redux";
import UserContentSection from "../../components/UserContentSection";
class UserContentView extends React.Component {
  render() {
    return (
      <div className="view-container">
        <UserContentSection articles={this.props.articles} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles.userArticles,
});

const UserContentViewConnected = connect(mapStateToProps)(UserContentView);
UserContentViewConnected.displayName = "UserContentView";
export default UserContentViewConnected;
