import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./views/Layout";
// import HomeViewConnected from "./views/HomeView";
import HomeViewNavigate from "./wrappers/HomeView";
import ArticleView from "./wrappers/ArticleView";
import UserContentView from "./wrappers/UserContentView";
import ArticleForm from "./views/ArticleFormView";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomeViewNavigate />,
      },
      {
        path: "/articles/:articleId",
        element: <ArticleView />,
      },
      {
        path: "articles/new-article",
        element: <ArticleForm />,
      },
      {
        path: "articles/:articleId/edit",
        element: <ArticleForm />,
      },
      {
        path: "/user/user-content",
        element: <UserContentView />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
