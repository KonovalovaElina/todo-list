import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { registerUser } from '../../store/authSlice'
import Layout from '../../layout/Layout'
import styles from '../../styles/AuthForm.module.css'
import { emailValidation, nameValidation, passwordValidation } from '../../utils/authValidation'

type RegisterFormData = {
  name: string
  email: string
  password: string
}

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.auth.isLoading)
  const [authError, setAuthError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ mode: 'onBlur' })

  const onSubmit = async (data: RegisterFormData) => {
    setAuthError(null)

    try {
      await dispatch(registerUser(data)).unwrap()
      navigate('/tasks')
    } catch (message) {
      setAuthError(typeof message === 'string' ? message : 'Ошибка регистрации')
    }
  }

  return (
    <Layout>
      <section className={styles.auth}>
        <h1 className={styles.auth__title}>Регистрация</h1>
        <p className={styles.auth__subtitle}>
          Создайте аккаунт, чтобы начать управлять задачами
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
            <label className={styles.form__label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`${styles.form__input} ${errors.email ? styles['form__input--error'] : ''}`}
              placeholder="example@mail.com"
              {...register('email', emailValidation)}
            />
            {errors.email && (
              <span className={styles.form__error}>{errors.email.message}</span>
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
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className={styles.auth__footer}>
          Уже есть аккаунт?{' '}
          <Link to="/login" className={styles.auth__link}>
            Войти
          </Link>
        </p>
      </section>
    </Layout>
  )
}
