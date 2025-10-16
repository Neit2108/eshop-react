import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";

interface AuthState{
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
}

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) return null

      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        localStorage.removeItem('authToken')
        return null
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('Loi khi khoi tao xac thuc : ' + error)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) throw new Error('Login failed')

      const data = await response.json()
      localStorage.setItem('authToken', data.token)
      return data.user
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed')
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('authToken')
    return null
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true
      })
      .addCase(initializeAuth.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = !!action.payload
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.error = null
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer