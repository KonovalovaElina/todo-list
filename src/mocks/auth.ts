import type { AuthResult, RegisterData, User } from '../types/app'

const MOCK_DELAY_MS = 800

let mockUsers: User[] = [
  {
    id: '1',
    name: 'Пользователь1',
    email: 'user@mail.com',
    password: 'Password1',
  },
]

const delay = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

export async function mockRegister(data: RegisterData): Promise<AuthResult> {
  await delay()

  const emailExists = mockUsers.some(
    (user) => user.email.toLowerCase() === data.email.toLowerCase(),
  )

  if (emailExists) {
    return {
      success: false,
      message: 'Пользователь с таким email уже существует',
    }
  }

  const newUser: User = {
    id: String(Date.now()),
    name: data.name,
    email: data.email,
    password: data.password,
  }

  mockUsers = [...mockUsers, newUser]

  return {
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      isAuthenticated: true,
    },
  }
}

export async function mockLogin(name: string, password: string): Promise<AuthResult> {
  await delay()

  const user = mockUsers.find(
    (item) => item.name === name && item.password === password,
  )

  if (!user) {
    return {
      success: false,
      message: 'Неверное имя или пароль',
    }
  }

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      isAuthenticated: true,
    },
  }
}

export const MOCK_CREDENTIALS_HINT = {
  name: mockUsers[0].name,
  password: mockUsers[0].password,
}
