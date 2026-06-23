import { motion } from 'framer-motion';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header>
      <motion.nav
        className={styles.nav}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.logo}>
          <span className={styles.logoIcon}>✓</span>
          TaskFlow
        </div>
        <motion.button
          className={styles.cta}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Войти
        </motion.button>
      </motion.nav>
    </header>
  )
}
