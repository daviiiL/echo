import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation";
import * as sessionActions from "../../store/session";
import { Modal } from "../../context/Modal";
import "./Layout.css";
import "../../assets/view/index.css";
export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <div id="main">
      <Modal />
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <div id="main-view-container">
          <div id="main-view-spacer"></div>
          <Outlet />
        </div>
      )}
    </div>
  );
}
