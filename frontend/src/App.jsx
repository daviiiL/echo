import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./views/Layout";
// import HomeViewConnected from "./views/HomeView";
import HomeViewNavigate from "./wrappers/HomeView";
import ArticleView from "./wrappers/ArticleView";
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
