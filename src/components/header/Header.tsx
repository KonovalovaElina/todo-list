import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  const { pathname } = useLocation()
  const isTasksPage = pathname === '/tasks'

  return (
    <header>
      <motion.nav
        className={styles.nav}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>✓</span>
          TaskFlow
        </Link>
        {!isTasksPage && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/login" className={styles.cta}>
              Войти
            </Link>
          </motion.div>
        )}
      </motion.nav>
    </header>
  )
}
