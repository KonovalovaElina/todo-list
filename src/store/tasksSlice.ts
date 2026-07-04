import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Task } from '../types/app'
import { loginUser, logout, registerUser } from './authSlice'

type TasksSliceState = {
  items: Task[]
  isLoading: boolean
}

const initialState: TasksSliceState = {
  items: [],
  isLoading: false,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        done: false,
      })
    },
    toggleTaskDone: (state, action: PayloadAction<{ id: number; done: boolean }>) => {
      const task = state.items.find((item) => item.id === action.payload.id)
      if (task) {
        task.done = action.payload.done
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((task) => task.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.tasks
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.tasks
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(logout, (state) => {
        state.items = []
        state.isLoading = false
      })
  },
})

export const { addTask, toggleTaskDone, deleteTask } = tasksSlice.actions
export default tasksSlice.reducer
