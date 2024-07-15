import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./views/Layout";
// import HomeViewConnected from "./views/HomeView";
import HomeViewNavigate from "./wrappers/HomeView";
import ArticleView from "./wrappers/ArticleView";
import ArticleForm from "./views/ArticleForm";
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
