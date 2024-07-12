import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./views/Layout";
import HomeViewConnected from "./views/HomeView";
import ArticleViewConnected from "./views/ArticleView";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomeViewConnected />,
      },
      {
        path: "/articles/:articleId",
        element: <ArticleViewConnected />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
