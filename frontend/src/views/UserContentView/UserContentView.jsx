import React from "react";
import { connect } from "react-redux";
import UserContentSection from "../../components/UserContentSection";
class UserContentView extends React.Component {
  render() {
    return (
      <div className="view-container">
        <UserContentSection
          //this component uses the first kwarg param to determine whether its for articles or comments
          //thus, pass something in; even if its an empty array
          articles={this.props.articles ? this.props.articles : []}
        />
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
