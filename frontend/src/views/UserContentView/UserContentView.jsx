import React from "react";
import { connect } from "react-redux";
class UserContentView extends React.Component {
  constructor(props) {
    super(props);
    this.userArticles = this.props.allArticles;
  }

  render() {
    return <div className="view-container">UserContent Component</div>;
  }
}

const mapStateToProps = (state) => ({
  allArticles: state.articles.allArticles,
});

const UserContentViewConnected = connect(mapStateToProps)(UserContentView);
UserContentViewConnected.displayName = "UserContentView";
export default UserContentViewConnected;
