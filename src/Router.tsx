import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from "./App";
import { ROUTES } from "./lib/constants";
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    errorElement: <NotFound />,
    children: [
    //   {
    //     path: ROUTES.DASHBOARD,
    //     element: <Dashboard />,
    //   },
    //   {
    //     path: ROUTES.SETTINGS,
    //     element: <Settings />,
    //   },
    //   {
    //     path: "*",
    //     element: <NotFound />,
    //   },
    ],
  },
]);

export function Router(){
    return <RouterProvider router={router} />
}