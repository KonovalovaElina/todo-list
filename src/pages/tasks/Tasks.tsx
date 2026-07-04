import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addTask, deleteTask, toggleTaskDone } from '../../store/tasksSlice'
import Layout from '../../layout/Layout'
import styles from './Tasks.module.css'

export default function Tasks() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const tasks = useAppSelector((state) => state.tasks.items)
  const isTasksLoading = useAppSelector((state) => state.tasks.isLoading)
  const [newTaskText, setNewTaskText] = useState('')

  useEffect(() => {
    if (!user?.isAuthenticated) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleToggleDone = (id: number, checked: boolean) => {
    dispatch(toggleTaskDone({ id, done: checked }))
  }

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id))
  }

  const handleAddTask = () => {
    const text = newTaskText.trim()
    if (!text) return

    dispatch(addTask(text))
    setNewTaskText('')
  }

  if (!user?.isAuthenticated) {
    return null
  }

  return (
    <Layout>
      <section className={styles.tasks}>
        <h1 className={styles.tasks__title}>Мои задачи</h1>

        <form
          className={styles.tasks__add}
          onSubmit={(event) => {
            event.preventDefault()
            handleAddTask()
          }}
        >
          <input
            type="text"
            className={styles.tasks__input}
            placeholder="Новая задача"
            value={newTaskText}
            onChange={(event) => setNewTaskText(event.target.value)}
          />
          <button type="submit" className={styles.tasks__addBtn}>
            Добавить задачу
          </button>
        </form>

        {isTasksLoading ? (
          <p className={styles.tasks__loading}>Загрузка задач...</p>
        ) : (
          <ul className={styles.tasks__list}>
            {tasks.map((task) => (
              <li key={task.id} className={styles.tasks__item}>
                <input
                  type="checkbox"
                  className={styles.tasks__checkbox}
                  checked={task.done}
                  onChange={(event) => handleToggleDone(task.id, event.target.checked)}
                />
                <span
                  className={`${styles.tasks__text} ${task.done ? styles['tasks__text--done'] : ''}`}
                >
                  {task.text}
                </span>
                <button
                  type="button"
                  className={styles.tasks__deleteBtn}
                  onClick={() => handleDelete(task.id)}
                  aria-label="Удалить задачу"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  )
}
