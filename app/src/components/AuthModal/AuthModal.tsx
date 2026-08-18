import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { supabase } from '../../lib/supabaseClient'
import styles from './AuthModal.module.css'

export type AuthTab = 'login' | 'signup'

interface AuthModalProps {
  open: boolean
  tab: AuthTab
  onTabChange: (tab: AuthTab) => void
  onClose: () => void
}

function AuthModal({ open, tab, onTabChange, onClose }: AuthModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [canResend, setCanResend] = useState(false)
  const [resendState, setResendState] = useState<'idle' | 'loading' | 'sent' | 'already-confirmed' | 'error'>(
    'idle',
  )
  const navigate = useNavigate()

  if (!open) return null

  const isLogin = tab === 'login'

  function resetForm() {
    setName('')
    setEmail('')
    setPassword('')
    setError(null)
    setNotice(null)
    setCanResend(false)
    setResendState('idle')
  }

  function handleClose() {
    resetForm()
    onClose()
  }

  function switchTab(next: AuthTab) {
    resetForm()
    onTabChange(next)
  }

  async function handleSubmit() {
    setError(null)
    setNotice(null)
    setCanResend(false)
    setResendState('idle')
    setLoading(true)

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) {
          console.error('[لغتي auth] signIn error', signInError.status, signInError.code, signInError.message)
          // سوباباز بترجع نفس الخطأ العام لكلمة المرور الغلط ولإيميل مش متأكد —
          // مش قادرين نفرق بينهم من غير ما نجرب نبعت تأكيد تاني
          setError(
            signInError.code === 'email_not_confirmed'
              ? 'لازم تأكّد إيميلك الأول — افتح الرسالة اللي بعتناهالك'
              : 'البريد أو كلمة المرور غلط',
          )
          setCanResend(true)
          return
        }
        resetForm()
        onClose()
        navigate('/dashboard')
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name }, emailRedirectTo: window.location.origin },
        })
        if (signUpError) {
          console.error('[لغتي auth] signUp error', signUpError.status, signUpError.code, signUpError.message)
          setError(
            signUpError.code === 'over_email_send_rate_limit'
              ? 'في طلبات كتير دلوقتي، استنى شوية وجرّب تاني'
              : 'حصلت مشكلة، جرّب تاني — لو عندك إضافات في المتصفح (زي أدوات الخصوصية أو الإعلانات) جرّب تقفلها',
          )
          return
        }
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          setError('الإيميل ده مسجّل قبل كده')
          return
        }
        if (data.session) {
          resetForm()
          onClose()
          navigate('/dashboard')
        } else {
          setNotice('بعتنالك إيميل تأكيد — افتحه عشان تفعّل حسابك 📩')
        }
      }
    } catch (err) {
      console.error('[لغتي auth] request threw', err)
      setError('حصلت مشكلة في الاتصال — لو عندك إضافات في المتصفح جرّب تقفلها وحاول تاني')
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setResendState('loading')
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: { emailRedirectTo: window.location.origin },
      })
      if (resendError) {
        console.error('[لغتي auth] resend error', resendError.status, resendError.code, resendError.message)
        setResendState(resendError.message.toLowerCase().includes('confirm') ? 'already-confirmed' : 'error')
      } else {
        setResendState('sent')
      }
    } catch {
      setResendState('error')
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div className={styles.modal}>
        <button className={styles.close} onClick={handleClose} aria-label="قفل">
          ✕
        </button>
        <div className={styles.tabs}>
          <button className={isLogin ? styles.active : ''} onClick={() => switchTab('login')}>
            دخول
          </button>
          <button className={!isLogin ? styles.active : ''} onClick={() => switchTab('signup')}>
            حساب جديد
          </button>
        </div>

        {!isLogin && (
          <div className={styles.field}>
            <label htmlFor="auth-name">اسمك</label>
            <input
              id="auth-name"
              type="text"
              placeholder="اكتب اسمك"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className={styles.field}>
          <label htmlFor="auth-email">البريد الإلكتروني</label>
          <input
            id="auth-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="auth-password">كلمة المرور</label>
          <input
            id="auth-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {notice && <div className={styles.notice}>{notice}</div>}

        {canResend && (
          <div className={styles.resend}>
            {resendState === 'sent' && <div className={styles.notice}>بعتنالك إيميل تأكيد جديد — افتحه وجرّب تاني 📩</div>}
            {resendState === 'already-confirmed' && (
              <div className={styles.error}>الإيميل ده متأكد بالفعل — يبقى كلمة المرور هي الغلط</div>
            )}
            {resendState === 'error' && <div className={styles.error}>حصلت مشكلة، جرّب تاني</div>}
            {(resendState === 'idle' || resendState === 'loading') && (
              <button type="button" className={styles.resendLink} onClick={handleResend} disabled={resendState === 'loading'}>
                {resendState === 'loading' ? 'بنبعت...' : 'لسه ماأكّدتش إيميلك؟ ابعتلنا التأكيد تاني'}
              </button>
            )}
          </div>
        )}

        <Button variant="primary" className={styles.submit} onClick={handleSubmit} disabled={loading}>
          {loading ? 'لحظة...' : isLogin ? 'دخول' : 'إنشاء حساب'}
        </Button>
      </div>
    </div>
  )
}

export default AuthModal
