import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { mockLogin, mockRegister } from '../mocks/auth'
import { mockFetchTasks } from '../mocks/tasks'
import type { AuthState, RegisterData, Task } from '../types/app'

type AppContextValue = {
  user: AuthState | null
  tasks: Task[]
  isTasksLoading: boolean
  registerUser: (data: RegisterData) => Promise<{ success: boolean; message?: string }>
  loginUser: (name: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  loadTasks: (userId: string) => Promise<void>
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthState | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [isTasksLoading, setIsTasksLoading] = useState(false)

  const loadTasks = useCallback(async (userId: string) => {
    setIsTasksLoading(true)
    const fetchedTasks = await mockFetchTasks(userId)
    setTasks(fetchedTasks)
    setIsTasksLoading(false)
  }, [])

  const registerUser = useCallback(async (data: RegisterData) => {
    const result = await mockRegister(data)

    if (!result.success) {
      return { success: false, message: result.message }
    }

    setUser(result.user)
    await loadTasks(result.user.id)

    return { success: true }
  }, [loadTasks])

  const loginUser = useCallback(async (name: string, password: string) => {
    const result = await mockLogin(name, password)

    if (!result.success) {
      return { success: false, message: result.message }
    }

    setUser(result.user)
    await loadTasks(result.user.id)

    return { success: true }
  }, [loadTasks])

  const logout = useCallback(() => {
    setUser(null)
    setTasks([])
  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        tasks,
        isTasksLoading,
        registerUser,
        loginUser,
        logout,
        loadTasks,
        setTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }

  return context
}
