export const nameValidation = {
  required: 'Имя обязательно для заполнения',
  minLength: {
    value: 2,
    message: 'Имя должно содержать минимум 2 символа',
  },
  pattern: {
    value: /^[a-zA-Zа-яА-ЯёЁ0-9]+$/,
    message: 'Имя может содержать только буквы и цифры',
  },
}

export const emailValidation = {
  required: 'Email обязателен для заполнения',
  pattern: {
    value: /^[a-z0-9._-]+@[a-z]{2,}\.[a-z]{2,}$/i,
    message:
      'Email должен содержать буквы, цифры, "@", ".", "-", "_" и быть в формате example@mail.com',
  },
}

export const passwordValidation = {
  required: 'Пароль обязателен для заполнения',
  minLength: {
    value: 8,
    message: 'Пароль должен содержать минимум 8 символов',
  },
  pattern: {
    value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9]+$/,
    message: 'Пароль: минимум 8 символов, заглавная буква, цифра, только латиница',
  },
}
