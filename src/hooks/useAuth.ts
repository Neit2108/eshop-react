import { useDispatch, useSelector } from 'react-redux'
import { login, logout, clearError, signup } from '@/store/slices/authSlice'
import type { RootState, AppDispatch } from '@/store/store'
import type { SignupFormData } from '@/types'

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, isLoading, isAuthenticated, error } = useSelector((state: RootState) => state.auth)

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    signup: (data: SignupFormData) => dispatch(signup(data)),
    login: (email: string, password: string) =>
      dispatch(login({ email, password })),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearError()),
  }
}