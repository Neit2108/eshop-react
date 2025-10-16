import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from "./App";
import { ROUTES } from "./lib/constants";
import NotFound from './pages/NotFound';
import LoginPage from './pages/login/Login';

const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.HOME,
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // {
      //   path: ROUTES.DASHBOARD,
      //   element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      // },
      // {
      //   path: ROUTES.SETTINGS,
      //   element: <ProtectedRoute><Settings /></ProtectedRoute>,
      // },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export function Router(){
    return <RouterProvider router={router} />
}