import { Link } from 'react-router-dom'
import LogoIcon from '../../icons/LogoIcon'
import Button from '../../ui/Button'
import type { AuthTab } from '../../AuthModal/AuthModal'
import { useAuth } from '../../../context/useAuth'
import { supabase } from '../../../lib/supabaseClient'
import styles from './Header.module.css'

interface HeaderProps {
  onOpenAuth: (tab: AuthTab) => void
}

function Header({ onOpenAuth }: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.nav}`}>
        <Link to="/" className={styles.logo}>
          <LogoIcon />
          لغتي
        </Link>
        <nav className={styles.navlinks}>
          <a href="#how">إزاي بيشتغل</a>
          <a href="#options">أبطال الفيديو</a>
          <a href="#features">المميزات</a>
          <a href="#pricing">الباقات</a>
        </nav>
        <div className={styles.navcta}>
          {user ? (
            <>
              <Link to="/dashboard" className={styles.dashboardLink}>
                لوحة الطفل
              </Link>
              <span className={styles.greeting}>
                أهلاً، {(user.user_metadata.full_name as string | undefined) || user.email}
              </span>
              <Button variant="ghost" onClick={() => supabase.auth.signOut()}>
                خروج
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => onOpenAuth('login')}>
                دخول
              </Button>
              <Button variant="primary" onClick={() => onOpenAuth('signup')}>
                ابدأ مجانًا
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
