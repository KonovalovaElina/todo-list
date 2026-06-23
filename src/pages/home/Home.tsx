import { motion, type Variants } from 'framer-motion'
import Layout from '../../layout/Layout'
import styles from './Home.module.css'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Home() {
  return (
    <Layout>
      <div className={styles.landing}>
        <motion.div
          className={`${styles['landing__orb']} ${styles['landing__orb--1']}`}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={`${styles['landing__orb']} ${styles['landing__orb--2']}`}
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={`${styles['landing__orb']} ${styles['landing__orb--3']}`}
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <section className={styles.home}>
          <motion.h1
            className={styles['home__title']}
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Управляйте задачами{' '}
            <span className={styles['home__title-gradient']}>легко и красиво</span>
          </motion.h1>

          <motion.p
            className={styles['home__subtitle']}
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            TaskFlow — минималистичный менеджер задач, который помогает
            сосредоточиться на главном и достигать целей быстрее
          </motion.p>

          <motion.div
            className={styles['home__actions']}
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <motion.button
              className={`${styles.btn} ${styles['btn--primary']}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Создать аккаунт бесплатно
            </motion.button>
          </motion.div>
        </section>
      </div>
    </Layout>
  )
}
