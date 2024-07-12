import { NavLink } from "react-router-dom";
import "./Navigation.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
function Navigation() {
  return (
    <div id="navbar">
      <ul>
        <li>
          <OpenModalButton
            buttonText={"Login"}
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
