import { useNavigate } from "react-router-dom";
import HomeViewConnected from "../views/HomeView/HomeView";

export default function HomeViewNavigate() {
  const navigate = useNavigate();
  return <HomeViewConnected navigate={navigate} />;
}
