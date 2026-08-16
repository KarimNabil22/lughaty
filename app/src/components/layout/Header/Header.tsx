import LogoIcon from '../../icons/LogoIcon'
import Button from '../../ui/Button'
import type { AuthTab } from '../../AuthModal/AuthModal'
import styles from './Header.module.css'

interface HeaderProps {
  onOpenAuth: (tab: AuthTab) => void
}

function Header({ onOpenAuth }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.nav}`}>
        <div className={styles.logo}>
          <LogoIcon />
          لغتي
        </div>
        <nav className={styles.navlinks}>
          <a href="#how">إزاي بيشتغل</a>
          <a href="#options">أبطال الفيديو</a>
          <a href="#features">المميزات</a>
          <a href="#pricing">الباقات</a>
        </nav>
        <div className={styles.navcta}>
          <Button variant="ghost" onClick={() => onOpenAuth('login')}>
            دخول
          </Button>
          <Button variant="primary" onClick={() => onOpenAuth('signup')}>
            ابدأ مجانًا
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
