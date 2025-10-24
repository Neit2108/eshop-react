import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { initializeAuth } from "./store/slices/authSlice";
import { MainLayout } from "@/components/layout";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { Toaster } from "sonner";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(initializeAuth() as any);
  }, [dispatch]);

  return (
    <ErrorBoundary fallback={'Có lỗi xảy ra. Vui lòng thử lại sau.'}>
      <MainLayout>
        <Outlet />
      </MainLayout>

      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={true}
        toastOptions={{
          className: "toast-custom",
          duration: 4000,
        }}
      />
    </ErrorBoundary>
  );
}
