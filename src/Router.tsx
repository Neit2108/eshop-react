import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { ROUTES } from "./lib/constants";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/login/Login";
import SignupPage from "./pages/signup/Signup";
import ProductListPage from "@/pages/product/ProductListPage";
import ProductDetailPage from "@/components/features/products/detail/ProductDetailPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/checkout/Checkout";
import AdminApp from "./AdminApp";
import { DashboardPage } from "./pages/admin/DashboardPage";
import CreateProductPage from "./pages/product/CreateProductPage";
import CreateProductPage2 from "./components/features/products/steps-2/CreateProductPage";
import ChatApp from "./components/features/chat/Chat";
import OrdersPage from "./pages/order/OrderPage";
import PaymentPage from "./pages/payment/PaymentPage";
import HomePage from "./pages/home/Home";
import { StoreDetailPage } from "./pages/shop/StoreDetailPage";
import { ProductManagement } from "./pages/product/ProductManagement";
import { OrderManagement } from "./pages/order/OrderManagement";

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
        element: < HomePage/>,
      },
      {
        path: ROUTES.PRODUCT_LIST,
        element: <ProductListPage />,
      },
      {
        path: ROUTES.PRODUCT_DETAIL,
        // element: <ProductDetailPage />
        element: (
          <ProtectedRoute>
            <ProductDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.CART,
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.CHECKOUT,
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.ORDERS,
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/shop/:id",
        element: <ProtectedRoute>
          <StoreDetailPage />
        </ProtectedRoute>
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["SYSTEM_ADMIN"]}>
        <AdminApp />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "products/create", element: <CreateProductPage /> },
      { path: "products/2", element: <CreateProductPage2 /> },
      { path: "products/list", element: <ProductManagement /> },
      { path: "orders/list", element: <OrderManagement /> },
    ],
  },
  {
    path: "/chat",
    element: <ChatApp />,
  },
  {
    path: "/payment",
    element: (
      <ProtectedRoute>
        <PaymentPage />
      </ProtectedRoute>
    ),
    children: [{ path: "result", element: <PaymentPage /> }],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
