import { useCallback, useEffect, useState, type ReactNode } from 'react'
import todo1 from '../../assets/todo1.png'
import todo2 from '../../assets/todo2.png'
import todo3 from '../../assets/todo3.jpg'
import Dots from './Dots'
import { getDirection } from './getDirection'
import { SliderContext } from './SliderContext'
import styles from './Slider.module.css'

const AUTOPLAY_INTERVAL_MS = 4000

const SLIDES = [
  { src: todo1, alt: 'Интерфейс TaskFlow — список задач' },
  { src: todo2, alt: 'Интерфейс TaskFlow — управление проектами' },
  { src: todo3, alt: 'Интерфейс TaskFlow — планирование' },
]

type SliderProps = {
  children?: ReactNode
}

export default function Slider({ children }: SliderProps) {
  const [currentSlide, setCurrentSlideState] = useState(0)
  const [direction, setDirection] = useState(getDirection(0, 0, SLIDES.length))
  const [autoplay, setAutoplayContext] = useState(true)

  const setCurrentSlide = useCallback((index: number) => {
    const normalizedIndex = (index + SLIDES.length) % SLIDES.length

    setCurrentSlideState((prev) => {
      setDirection(getDirection(prev, normalizedIndex, SLIDES.length))
      return normalizedIndex
    })
  }, [])

  useEffect(() => {
    if (!autoplay) return

    const timer = setInterval(() => {
      setCurrentSlideState((prev) => {
        const next = (prev + 1) % SLIDES.length
        setDirection(getDirection(prev, next, SLIDES.length))
        return next
      })
    }, AUTOPLAY_INTERVAL_MS)

    return () => clearInterval(timer)
  }, [autoplay])

  const contextValue = {
    currentSlide,
    direction,
    autoplay,
    slidesCount: SLIDES.length,
    setCurrentSlide,
    setAutoplayContext,
  }

  return (
    <SliderContext.Provider value={contextValue}>
      <div className={styles.slider}>
        <div className={styles.slider__viewport}>
          <div
            className={`${styles.slider__track} ${styles[`slider__track--${direction}`]}`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div key={slide.src} className={styles.slider__slide}>
                <img
                  className={styles.slider__image}
                  src={slide.src}
                  alt={slide.alt}
                />
              </div>
            ))}
          </div>
        </div>

        {children ?? <Dots />}
      </div>
    </SliderContext.Provider>
  )
}
