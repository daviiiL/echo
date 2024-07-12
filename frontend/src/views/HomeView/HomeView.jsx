import React from "react";
import "./HomeView.css";
import { connect } from "react-redux";
import ArticleCard from "../../components/ArticleCard";

class HomeView extends React.Component {
  render() {
    return (
      <div className="view-container" id="home">
        <div id="tags-bar"></div>
        <div id="articles-view">
          {this.props.allArticles &&
            this.props.allArticles.length > 0 &&
            this.props.allArticles.map((e) => {
              return (
                <div
                  key={e.id}
                  onClick={() => this.props.navigate(`/articles/${e.id}`)}
                >
                  <ArticleCard article={e} navigate={this.props.navigate} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allArticles: state.articles?.allArticles,
});

const HomeViewConnected = connect(mapStateToProps)(HomeView);
HomeViewConnected.displayName = "HomeView";

export default HomeViewConnected;
