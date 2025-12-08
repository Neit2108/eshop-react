import { useDispatch, useSelector } from 'react-redux'
import { login, logout, clearError, signup } from '@/store/slices/authSlice'
import type { RootState, AppDispatch } from '@/store/store'
import type { SignupFormData } from '@/types'

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, isLoading, isAuthenticated, error } = useSelector((state: RootState) => state.auth)
  const hasRoles = (roles: string | string[]) => {
    if (!user?.roles) return false
    const requiredRoles = Array.isArray(roles) ? roles : [roles]
    return requiredRoles.some(role => user.roles?.includes(role))
  }

  return {
    user,
    roles: user?.roles,
    isLoading,
    isAuthenticated,
    error,
    signup: (data: SignupFormData) => dispatch(signup(data)),
    login: (email: string, password: string) =>
      dispatch(login({ email, password })),
    logout: () => dispatch(logout()),
    hasRoles,
    clearError: () => dispatch(clearError()),
  }
}