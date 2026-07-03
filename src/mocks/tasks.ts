import type { Task } from '../types/app'

const MOCK_DELAY_MS = 600

const TASKS_BY_USER: Record<string, Task[]> = {
  '1': [
    { id: 1, text: 'Посмотреть лекции', done: false },
    { id: 2, text: 'Закончить ДЗ по React', done: false },
    { id: 3, text: 'Зачет по TypeScript', done: true },
  ],
}

const DEFAULT_TASKS: Task[] = [
  { id: 1, text: 'Добавить первую задачу', done: false },
]

export async function mockFetchTasks(userId: string): Promise<Task[]> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

  return [...(TASKS_BY_USER[userId] ?? DEFAULT_TASKS)]
}
