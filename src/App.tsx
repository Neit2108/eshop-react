import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { initializeAuth } from "./store/slices/authSlice";
import { MainLayout } from "@/components/layout";
import ErrorBoundary from "./components/common/ErrorBoundary";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(initializeAuth() as any);
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </ErrorBoundary>
  );
}
