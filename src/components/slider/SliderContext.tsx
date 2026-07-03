import { createContext, useContext } from 'react'
import type { SlideDirection } from './getDirection'

export type SliderContextValue = {
  currentSlide: number
  direction: SlideDirection
  autoplay: boolean
  slidesCount: number
  setCurrentSlide: (index: number) => void
  setAutoplayContext: (value: boolean) => void
}

export const SliderContext = createContext<SliderContextValue | null>(null)

export function useSliderContext() {
  const context = useContext(SliderContext)

  if (!context) {
    throw new Error('useSliderContext must be used within Slider')
  }

  return context
}
