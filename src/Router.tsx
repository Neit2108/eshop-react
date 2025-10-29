import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from "./App";
import { ROUTES } from "./lib/constants";
import NotFound from './pages/NotFound';
import LoginPage from './pages/login/Login';
import SignupPage from './pages/signup/Signup';
import HomePage from './pages/home/Home';
import ProductListPage from '@/pages/product/ProductListPage';
import ProductDetailPage from '@/components/features/products/detail/ProductDetailPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/Checkout';
import AdminApp from './AdminApp';
import { DashboardPage } from './pages/admin/DashboardPage';

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
        // element: <ProductDetailPage />
        element: <ProtectedRoute><ProductDetailPage /></ProtectedRoute>,
      },
      {
        path: ROUTES.CART,
        element: <ProtectedRoute><CartPage /></ProtectedRoute>,
      },
      {
        path: ROUTES.CHECKOUT,
        element: <ProtectedRoute><CheckoutPage/></ProtectedRoute>
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute roles={['SYSTEM_ADMIN']}><AdminApp /></ProtectedRoute>,
    children: [
      {index: true, element: <DashboardPage />},
      {path: "users", element: <div>User Management</div>},
    ]
  }
]);

export function Router(){
    return <RouterProvider router={router} />
}