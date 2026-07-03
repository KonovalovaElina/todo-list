export type SlideDirection = 'left' | 'right'

export function getDirection(
  currentIndex: number,
  targetIndex: number,
  total: number,
): SlideDirection {
  if (currentIndex === targetIndex) return 'right'

  const forwardSteps = (targetIndex - currentIndex + total) % total
  return forwardSteps <= total / 2 ? 'right' : 'left'
}
