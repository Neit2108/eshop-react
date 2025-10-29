import { fetchSummaryStats } from "@/store/slices/adminSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export function useAdmin() {
  const dispatch = useDispatch<AppDispatch>();

  const { summaryStats, loading, error } = useSelector(
    (state: RootState) => state.admin,
  );

  return {
    summaryStats,
    loading,
    error,
    fetchSummaryStats: () => dispatch(fetchSummaryStats()),
  };
}
