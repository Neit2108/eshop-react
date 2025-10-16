import { useDispatch, useSelector } from 'react-redux'
import { login, logout, clearError } from '@/store/slices/authSlice'
import type { RootState, AppDispatch } from '@/store/store'

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, isLoading, isAuthenticated, error } = useSelector((state: RootState) => state.auth)

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    login: (email: string, password: string) =>
      dispatch(login({ email, password })),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearError()),
  }
}