import { NavLink } from "react-router-dom";
import "./Navigation.css";
import React from "react";
import ProfileButton from "./ProfileButton";
import { connect } from "react-redux";
import icon from "./echo_logo_icon_only.png";
import { IoIosAdd } from "react-icons/io";

class Navigation extends React.Component {
  render() {
    return (
      <div id="navbar">
        <ul>
          <li className="nav-items">
            <div className="nav-icon-container">
              {" "}
              <NavLink to="/">
                <img id="icon" src={icon}></img>
              </NavLink>
            </div>
          </li>
          <li className="nav-items">
            <ProfileButton sessionUser={this.props.session.user} />
          </li>

          <li className="nav-items">
            {this.props.session.user?.id ? (
              <NavLink to="/articles/new-article">
                <div id="add-article-button">
                  <IoIosAdd size={40} />
                </div>
              </NavLink>
            ) : (
              <div
                id="add-article-button"
                onClick={() => {
                  window.alert("Please login to post an article");
                }}
              >
                <IoIosAdd size={40} />
              </div>
            )}
          </li>
          <li className="nav-items">Words</li>
          <li className="nav-items">Chats</li>
          <li className="nav-items">News</li>
          <li className="nav-items">
            <NavLink to="/user/user-content">Yours</NavLink>
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
