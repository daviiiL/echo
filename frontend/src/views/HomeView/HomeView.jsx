import React from "react";
import "./HomeView.css";
import { connect } from "react-redux";

class HomeView extends React.Component {
  render() {
    return (
      <div className="view-container" id="home">
        <h1>HomeView</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles,
});

const HomeViewConnected = connect(mapStateToProps)(HomeView);
HomeViewConnected.displayName = "HomeView";
export default HomeViewConnected;
