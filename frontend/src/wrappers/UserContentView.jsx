import { useNavigate } from "react-router-dom";
import UserContentViewConnected from "../views/UserContentView/UserContentView";

export default function UserContentView(props) {
  const navigate = useNavigate();
  return <UserContentViewConnected {...props} navigate={navigate} />;
}
