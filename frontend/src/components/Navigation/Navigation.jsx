import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <div id="navbar">
      <ul>
        <li></li>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
