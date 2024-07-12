import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./views/Layout";
import HomeViewConnected from "./views/HomeView";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomeViewConnected />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
