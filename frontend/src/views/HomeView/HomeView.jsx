import React from "react";
import "./HomeView.css";
import { connect } from "react-redux";
import ArticleCard from "../../components/ArticleCard";
import { clearArticleDetails } from "../../store/article";
import TagBar from "../../components/TagBar";
// import Select from "react-select";
class HomeView extends React.Component {
  componentDidMount() {
    const { clearArticleDetails } = this.props;
    clearArticleDetails();
  }
  render() {
    return (
      <div className="view-container" id="home">
        <div id="tags-bar">
          <TagBar />
        </div>
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
const mapDispatchToProps = (dispatch) => {
  return {
    clearArticleDetails: () => {
      dispatch(clearArticleDetails());
    },
  };
};

const HomeViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
HomeViewConnected.displayName = "HomeView";

export default HomeViewConnected;
