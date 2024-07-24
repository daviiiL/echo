import React from "react";
// import "./HomeView.css";
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
        <div className="mr-6">
          <div className="mb-5" id="tags-bar">
            <TagBar />
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9">
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
  mapDispatchToProps,
)(HomeView);
HomeViewConnected.displayName = "HomeView";
export default HomeViewConnected;
