export type User = {
  id: string
  name: string
  email: string
  password: string
}

export type AuthState = {
  id: string
  name: string
  isAuthenticated: boolean
}

export type Task = {
  id: number
  text: string
  done: boolean
}

export type AuthSuccess = {
  success: true
  user: AuthState
}

export type AuthFailure = {
  success: false
  message: string
}

export type AuthResult = AuthSuccess | AuthFailure

export type RegisterData = {
  name: string
  email: string
  password: string
}
