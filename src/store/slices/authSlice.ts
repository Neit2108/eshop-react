import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/services/apiService";
import { API_ENDPOINTS } from "@/lib/api";
import type { AuthResponse, SignupFormData, User, UpdateUserInput } from "@/types";

/**
 * Trạng thái xác thực người dùng
 */
interface AuthState{
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

/**
 * Khởi tạo trạng thái xác thực
 */
const initialState: AuthState = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
}

function isTokenExpired(token: string): boolean{
  try{
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Chuyển đổi sang milliseconds
    return Date.now() > expirationTime;
  } catch {
    return true;
  }
}

/**
 * Khởi tạo xác thực người dùng từ token lưu trong localStorage mỗi khi mở lại trang
 */
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if(!accessToken) {
        return null;
      }

      if(isTokenExpired(accessToken)) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('user');
        return rejectWithValue('Token đã hết hạn');
      }

      const response = await apiService.get<User>(API_ENDPOINTS.AUTH.ME);
      return response.data;
    } catch (error) {
      return rejectWithValue('Loi khi khoi tao xac thuc : ' + error)
    }
  }
)

export const signup = createAsyncThunk(
  'auth/signup',
  async (data: SignupFormData, {rejectWithValue}) =>{
    try{
    const {confirmPassword, ...signupData} = data;

    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNUP,
      signupData
    );

    const {user, accessToken, refreshToken, expiresIn} = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expiresIn', expiresIn.toString());
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  }
    catch (error){
      return rejectWithValue(error instanceof Error ? error.message : 'Đăng ký thất bại')
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      const {user, accessToken, refreshToken, expiresIn} = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('expiresIn', expiresIn.toString());
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Đăng nhập thất bại')
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await apiService.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error)
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('expiresIn')
      localStorage.removeItem('user')
      // eslint-disable-next-line no-unsafe-finally
      return null
    }
  }
)

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: UpdateUserInput, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const userId = user?.id
      
      if (!userId) {
        return rejectWithValue('Không tìm thấy ID người dùng')
      }

      const response = await apiService.put<User>(
        API_ENDPOINTS.USERS.UPDATE_PROFILE,
        data
      )

      const updatedUser = response.data
      localStorage.setItem('user', JSON.stringify(updatedUser))

      return updatedUser
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Cập nhật thông tin thất bại')
    }
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
      // Initialize Auth
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true
      })
      .addCase(initializeAuth.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.isLoading = false
        if (action.payload) {
          state.user = action.payload
          state.isAuthenticated = true
          state.error = null
        } else {
          state.user = null
          state.isAuthenticated = false
        }
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
        state.user = null
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.error = null
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer