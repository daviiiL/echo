import { NavLink } from "react-router-dom";
import "./Navigation.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import React from "react";
import { connect } from "react-redux";

class Navigation extends React.Component {
  render() {
    return (
      <div id="navbar">
        <ul>
          <li>
            <OpenModalButton
              buttonText={"Login"}
              modalComponent={<LoginFormModal />} // LoginFormModal is now named
            />
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Navigation);
