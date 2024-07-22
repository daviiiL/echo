import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  clearHomePageTags,
  fetchActiveTags,
  setHomepageTags,
} from "../../store/tag";
import { connect } from "react-redux";
import { capString } from "../../utils/stringUtils";
import "../../assets/components/TagBar.css";

const constructTagOptions = (tags) => {
  return tags.reduce((acc, el) => {
    //construct react select menu options; make label with cap but the db accepts only lower case tags
    const option = { value: el, label: capString(el) };
    acc.push(option);
    return acc;
  }, []);
};

const animatedComponents = makeAnimated();

class TagBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //fetch for active tags whenever the component mounts and tags store empty
    if (!this.props.allTags.length) this.props.fetchActiveTags();
  }

  componentWillUnmount() {
    //clear user selected tags whenever the tag bar is being destroyed;
    // this.props.clearHomePageTags();
  }

  handleChange = (e) => {
    this.props.setHomepageTags(e.map((e) => e.value));
  };

  render() {
    return (
      <>
        <Select
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: "2em",
            }),
            menu: (provided) => ({
              ...provided,
              width: "fit-content",
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
          placeholder="search for your favorite categories"
          defaultValue={this.props.selectedTags}
          options={this.props.allTags}
          onChange={this.handleChange}
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
  selectedTags: constructTagOptions(state.tags.selectedTags),
  // allTags: state.tags.allTags,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setHomepageTags: (tags) => {
      dispatch(setHomepageTags(tags));
    },
    clearHomePageTags: () => {
      dispatch(clearHomePageTags());
    },
    fetchActiveTags: () => {
      dispatch(fetchActiveTags());
    },
  };
};

const TagBarConnected = connect(mapStateToProps, mapDispatchToProps)(TagBar);
TagBarConnected.displayName = "TagBar";
export default TagBarConnected;
