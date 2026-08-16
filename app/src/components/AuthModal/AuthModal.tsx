import { useState } from 'react'
import Button from '../ui/Button'
import styles from './AuthModal.module.css'

export type AuthTab = 'login' | 'signup'

interface AuthModalProps {
  open: boolean
  tab: AuthTab
  onTabChange: (tab: AuthTab) => void
  onClose: () => void
}

function AuthModal({ open, tab, onTabChange, onClose }: AuthModalProps) {
  const [status, setStatus] = useState<string | null>(null)

  if (!open) return null

  const isLogin = tab === 'login'

  function handleSubmit() {
    setStatus('تجريبي — لسه مش شغّال ✋')
    setTimeout(() => setStatus(null), 1600)
  }

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="قفل">
          ✕
        </button>
        <div className={styles.tabs}>
          <button className={isLogin ? styles.active : ''} onClick={() => onTabChange('login')}>
            دخول
          </button>
          <button className={!isLogin ? styles.active : ''} onClick={() => onTabChange('signup')}>
            حساب جديد
          </button>
        </div>

        {!isLogin && (
          <div className={styles.field}>
            <label htmlFor="auth-name">اسمك</label>
            <input id="auth-name" type="text" placeholder="اكتب اسمك" />
          </div>
        )}
        <div className={styles.field}>
          <label htmlFor="auth-email">البريد الإلكتروني</label>
          <input id="auth-email" type="email" placeholder="you@example.com" />
        </div>
        <div className={styles.field}>
          <label htmlFor="auth-password">كلمة المرور</label>
          <input id="auth-password" type="password" placeholder="••••••••" />
        </div>

        <Button variant="primary" className={styles.submit} onClick={handleSubmit}>
          {status ?? (isLogin ? 'دخول' : 'إنشاء حساب')}
        </Button>
        <div className={styles.note}>نسخة تجريبية — الدخول لسه مش شغّال فعليًا.</div>
      </div>
    </div>
  )
}

export default AuthModal
