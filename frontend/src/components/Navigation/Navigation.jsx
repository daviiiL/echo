import { NavLink } from "react-router-dom";
import "./Navigation.css";
import React from "react";
import ProfileButton from "./ProfileButton";
import { connect } from "react-redux";
import icon from "./echo_logo_icon_only.png";
import { IoIosAdd } from "react-icons/io";
import { clearArticleErrors } from "../../store/article";
import UserProfileMenu from "../ReactDialogs/UserProfileMenu/UserProfileMenu";
import notify from "../Toaster/notify";
import { Button } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ChatIcon from "@mui/icons-material/Chat";
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
          <ProfileButton sessionUser={this.props.session.user} />
          {this.props.session?.user && (
            <li className="nav-items">
              <UserProfileMenu sessionUser={this.props.session.user} />
            </li>
          )}

          <li className="nav-items">
            {this.props.session.user?.id ? (
              <NavLink
                to="/articles/new-article"
                onClick={() => {
                  this.props.clearArticleErrors();
                }}
              >
                <div id="add-article-button">
                  <IoIosAdd size={40} />
                </div>
              </NavLink>
            ) : (
              <div
                id="add-article-button"
                onClick={() => {
                  // window.alert("Please login to post an article");
                  notify({
                    message: "Please login to post an article",
                    icon: "⛔",
                    position: "top-left",
                    // color: "error",
                  });
                }}
              >
                <IoIosAdd size={40} />
              </div>
            )}
          </li>
          <li className="nav-items">
            <Button aria-label="words" color="inherit" size="small">
              <NavLink to="/">
                <ArticleIcon />
                <p>articles</p>
              </NavLink>
            </Button>
          </li>
          <li className="nav-items">
            <Button
              aria-label="words"
              className="flex-col"
              color="inherit"
              size="small"
            >
              <NavLink
                onClick={() =>
                  notify({ message: "News Access coming soon", color: "green" })
                }
              >
                <NewspaperIcon />
                <p>news</p>
              </NavLink>
            </Button>
          </li>
          <li className="nav-items">
            <Button
              aria-label="words"
              className="flex-col"
              color="inherit"
              size="small"
            >
              <NavLink
                onClick={() =>
                  notify({ message: "Chatrooms opening soon", color: "green" })
                }
              >
                <ChatIcon />
                <p>chat</p>
              </NavLink>
            </Button>
          </li>

          {this.props.session.user?.id && (
            <li className="nav-items">
              <Button
                aria-label="words"
                className="flex-col"
                color="inherit"
                size="small"
              >
                <NavLink to="/user/user-content">
                  <HomeIcon />
                  <p>yours</p>
                </NavLink>
              </Button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  clearArticleErrors: () => dispatch(clearArticleErrors()),
});

const NavigationConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
NavigationConnected.displayName = "Navigation";
export default NavigationConnected;
