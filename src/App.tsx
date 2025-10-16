import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { initializeAuth } from "./store/slices/authSlice";
import { MainLayout } from "@/components/layout";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(initializeAuth() as any);
  }, [dispatch]);

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
