import { useNavigate } from "react-router-dom";
import ArticleViewConnected from "../views/ArticleView";

export default function ArticleView() {
  const navigate = useNavigate();
  return <ArticleViewConnected navigate={navigate} />;
}
