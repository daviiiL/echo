import React from "react";
import CreateSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { fetchActiveTags, fetchArticleTags } from "../../store/tag";
import { connect } from "react-redux";
import { capString } from "../../utils/stringUtils";
import { unwrapResult } from "@reduxjs/toolkit";

const constructTagOptions = (tags) => {
  return tags.reduce((acc, el) => {
    //construct react select menu options; make label with cap but the db accepts only lower case tags
    const option = { value: el, label: capString(el) };
    acc.push(option);
    return acc;
  }, []);
};

const animatedComponents = makeAnimated();

class ManageTagBar extends React.Component {
  constructor(props) {
    super(props);
    this.currentArticleTags = this.props.articleTags;
  }

  componentDidMount() {
    if (!this.props.allTags?.length) this.props.fetchActiveTags();
    this.props.fetchArticleTags(this.props.articleId);
  }

  componentDidUpdate() {}

  handleChange = (e) => {
    this.currentArticleTags = e.map((e) => e.value);
    this.props.setTags(this.currentArticleTags);
  };

  render() {
    return (
      <>
        <CreateSelect
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: "2em",
            }),
            menu: (provided) => ({
              ...provided,
              height: "max-content",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused && "#2196f3",
              color: state.isFocused && "white",
            }),
          }}
          isMulti
          id="tagbar"
          closeMenuOnSelect={true}
          components={animatedComponents}
          placeholder="find or create new tags to add : )"
          defaultValue={this.props.articleTags}
          options={this.props.allTags}
          onChange={this.handleChange}
          key={this.props.articleTags}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  //allTags are fetched from the backend API with format:
  // [
  //   {
  //     title: String,
  //     id: Integer,
  //     updatedAt: timestamp,
  //     createdAt: timestamp,
  //   }
  // ]
  allTags: constructTagOptions(state.tags.allTags?.map((e) => e.title)),
  //articletags is pre-formatted by its reducer action: arr(tagTitles)
  articleTags: constructTagOptions(state.tags.articleTags),
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticleTags: (articleId) => {
      dispatch(fetchArticleTags(articleId));
    },
    fetchActiveTags: () => {
      dispatch(fetchActiveTags());
    },
  };
};

const ManageTagBarConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageTagBar);
ManageTagBarConnected.displayName = "ManageTagBar";
export default ManageTagBarConnected;
