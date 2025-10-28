import { Outlet } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { AdminLayout } from "./components/layout/Admin/AdminLayout";
import { Toaster } from "sonner";

export default function AdminApp() {
  return (
    <ErrorBoundary fallback={'Có lỗi xảy ra. Vui lòng thử lại sau.'}>
      <AdminLayout>
        <Outlet />
      </AdminLayout>

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