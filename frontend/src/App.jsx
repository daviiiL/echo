import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./views/Layout";
import HomeView from "./views/HomeView";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
