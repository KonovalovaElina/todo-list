import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import Layout from '../../layout/Layout'
import { MOCK_CREDENTIALS_HINT } from '../../mocks/auth'
import styles from '../../styles/AuthForm.module.css'
import { nameValidation, passwordValidation } from '../../utils/authValidation'

type LoginFormData = {
  name: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const { loginUser } = useAppContext()
  const [authError, setAuthError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ mode: 'onBlur' })

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null)
    setIsLoading(true)

    const result = await loginUser(data.name, data.password)

    setIsLoading(false)

    if (!result.success) {
      setAuthError(result.message ?? 'Ошибка авторизации')
      return
    }

    navigate('/tasks')
  }

  return (
    <Layout>
      <section className={styles.auth}>
        <h1 className={styles.auth__title}>Вход</h1>
        <p className={styles.auth__subtitle}>
          Войдите в аккаунт, чтобы продолжить работу с задачами
        </p>
        <p className={styles.auth__hint}>
          Для успешного входа: {MOCK_CREDENTIALS_HINT.name} / {MOCK_CREDENTIALS_HINT.password}
        </p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.form__field}>
            <label className={styles.form__label} htmlFor="name">
              Имя
            </label>
            <input
              id="name"
              type="text"
              className={`${styles.form__input} ${errors.name ? styles['form__input--error'] : ''}`}
              placeholder="Введите имя"
              {...register('name', nameValidation)}
            />
            {errors.name && (
              <span className={styles.form__error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.form__field}>
            <label className={styles.form__label} htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className={`${styles.form__input} ${errors.password ? styles['form__input--error'] : ''}`}
              placeholder="Введите пароль"
              {...register('password', passwordValidation)}
            />
            {errors.password && (
              <span className={styles.form__error}>{errors.password.message}</span>
            )}
          </div>

          {authError && (
            <p className={styles.form__authError} role="alert">
              {authError}
            </p>
          )}

          <button type="submit" className={styles.form__submit} disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className={styles.auth__footer}>
          Нет аккаунта?{' '}
          <Link to="/register" className={styles.auth__link}>
            Зарегистрироваться
          </Link>
        </p>
      </section>
    </Layout>
  )
}
