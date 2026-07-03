export type AuthUser = {
  email: string
  password: string
  name: string
}

export type LoginResult =
  | { success: true; user: { email: string; name: string } }
  | { success: false; message: string }

const MOCK_USERS: AuthUser[] = [
  {
    email: 'user@mail.com',
    password: 'Password1',
    name: 'Тестовый пользователь',
  },
]

const MOCK_DELAY_MS = 800

export async function mockLogin(email: string, password: string): Promise<LoginResult> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

  const user = MOCK_USERS.find(
    (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
  )

  if (!user) {
    return {
      success: false,
      message: 'Неверный email или пароль',
    }
  }

  return {
    success: true,
    user: {
      email: user.email,
      name: user.name,
    },
  }
}

export const MOCK_CREDENTIALS_HINT = {
  email: MOCK_USERS[0].email,
  password: MOCK_USERS[0].password,
}
