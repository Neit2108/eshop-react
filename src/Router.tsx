import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from "./App";
import { ROUTES } from "./lib/constants";
import NotFound from './pages/NotFound';
import LoginPage from './pages/login/Login';
import SignupPage from './pages/signup/Signup';
import HomePage from './pages/home/Home';
import ProductListPage from '@/pages/product/ProductListPage';
import ProductDetailPage from '@/components/features/products/detail/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: ROUTES.HOME,
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.PRODUCT_LIST,
        element: <ProductListPage />,
      },
      {
        path: ROUTES.PRODUCT_DETAIL,
        element: <ProductDetailPage />,
      },
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