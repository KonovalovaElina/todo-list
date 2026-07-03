import { useState } from 'react'
import Layout from '../../layout/Layout'
import styles from './Tasks.module.css'

type Task = {
  id: number
  text: string
  done: boolean
}

const INITIAL_TASKS: Task[] = [
  { id: 1, text: 'Посмотреть лекции', done: false },
  { id: 2, text: 'Закончить ДЗ по React', done: false },
  { id: 3, text: 'Зачет по TypeScript', done: true },
]

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [newTaskText, setNewTaskText] = useState('')

  const handleToggleDone = (id: number, checked: boolean) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: checked } : task)),
    )
  }

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleAddTask = () => {
    const text = newTaskText.trim()
    if (!text) return

    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text, done: false },
    ])
    setNewTaskText('')
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
      </section>
    </Layout>
  )
}
