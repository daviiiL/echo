import React from "react";
import { connect } from "react-redux";
// import /* Select */ from "react-select";
class ArticleTagBar extends React.Component {
  render() {
    return <h1>Articletagbar</h1>;
  }
}

const ArticleTagBarConnected = connect()(ArticleTagBar);
ArticleTagBarConnected.displayName = "ArticleTagBar";
export default ArticleTagBarConnected;
