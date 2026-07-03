import { useSliderContext } from './SliderContext'
import styles from './Slider.module.css'

export default function Dots() {
  const { currentSlide, slidesCount, setCurrentSlide, setAutoplayContext } = useSliderContext()

  const handleDotClick = (index: number) => {
    setAutoplayContext(false)
    setCurrentSlide(index)
  }

  return (
    <div className={styles.slider__dots}>
      {Array.from({ length: slidesCount }, (_, index) => (
        <button
          key={index}
          type="button"
          className={`${styles.slider__dot} ${index === currentSlide ? styles['slider__dot--active'] : ''}`}
          onClick={() => handleDotClick(index)}
          aria-label={`Перейти к слайду ${index + 1}`}
        />
      ))}
    </div>
  )
}
