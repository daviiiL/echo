import { NavLink } from "react-router-dom";
import "./Navigation.css";
import React from "react";
import ProfileButton from "./ProfileButton";
import { connect } from "react-redux";
class Navigation extends React.Component {
  render() {
    return (
      <div id="navbar">
        <ul>
          <li>
            <ProfileButton sessionUser={this.props.session.user} />
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

const NavigationConnected = connect(mapStateToProps)(Navigation);
NavigationConnected.displayName = "Navigation";
export default NavigationConnected;
