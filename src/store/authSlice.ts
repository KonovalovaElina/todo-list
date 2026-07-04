import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { mockLogin, mockRegister } from '../mocks/auth'
import { mockFetchTasks } from '../mocks/tasks'
import type { AuthState, RegisterData, Task } from '../types/app'

type AuthSliceState = {
  user: AuthState | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthSliceState = {
  user: null,
  isLoading: false,
  error: null,
}

type AuthSuccessPayload = {
  user: AuthState
  tasks: Task[]
}

export const registerUser = createAsyncThunk<
  AuthSuccessPayload,
  RegisterData,
  { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
  const result = await mockRegister(data)

  if ('message' in result) {
    return rejectWithValue(result.message)
  }

  const tasks = await mockFetchTasks(result.user.id)

  return { user: result.user, tasks }
})

export const loginUser = createAsyncThunk<
  AuthSuccessPayload,
  { name: string; password: string },
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  const result = await mockLogin(credentials.name, credentials.password)

  if ('message' in result) {
    return rejectWithValue(result.message)
  }

  const tasks = await mockFetchTasks(result.user.id)

  return { user: result.user, tasks }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.error = null
    },
    clearAuthError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? 'Ошибка регистрации'
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? 'Ошибка авторизации'
      })
  },
})

export const { logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
