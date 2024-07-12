import { Outlet } from "react-router-dom";
import NavigationConnected from "../../components/Navigation";
import { Modal } from "../../context/Modal";

import "./Layout.css";
import "../../assets/view/index.css";
export default function Layout() {
  return (
    <div id="main">
      <Modal />
      <NavigationConnected />
      <div id="main-view-container">
        <div id="main-view-spacer"></div>
        <Outlet />
      </div>
    </div>
  );
}
