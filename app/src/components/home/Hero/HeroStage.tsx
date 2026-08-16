import { useEffect, useRef, useState } from 'react'
import MascotIcon from '../../icons/MascotIcon'
import CartoonHeroIcon from '../../icons/CartoonHeroIcon'
import styles from './HeroStage.module.css'

const MASCOT_PHRASES = [
  'أهلاً بيك! 👋',
  'يلا نتعلّم عربي!',
  'ابنك هيبقى البطل! ⭐',
  'جاهز للمغامرة؟ 🚀',
  'برافو! 🎉',
]

function HeroStage() {
  const [flipped, setFlipped] = useState(false)
  const [jumping, setJumping] = useState(false)
  const [bubble, setBubble] = useState<string | null>(null)
  const bubbleTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const interval = setInterval(() => setFlipped((f) => !f), 3200)
    return () => clearInterval(interval)
  }, [])

  function playMascot() {
    setJumping(true)
    setBubble(MASCOT_PHRASES[Math.floor(Math.random() * MASCOT_PHRASES.length)])
    setTimeout(() => setJumping(false), 500)
    clearTimeout(bubbleTimeout.current)
    bubbleTimeout.current = setTimeout(() => setBubble(null), 1800)
  }

  return (
    <div className={styles.stage}>
      <div className={styles.screen}>
        <div className={styles.flipwrap} onClick={() => setFlipped((f) => !f)}>
          <div className={`${styles.flipper} ${flipped ? styles.flip : ''}`}>
            <div className={`${styles.face} ${styles.photo}`}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 52 }}>📷</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>صورة ابنك</div>
              </div>
            </div>
            <div className={`${styles.face} ${styles.toon}`}>
              <CartoonHeroIcon />
            </div>
          </div>
        </div>

        <div
          className={`${styles.mascotHero} ${jumping ? styles.jump : styles.float}`}
          onClick={playMascot}
        >
          <MascotIcon />
        </div>
        {bubble && <div className={`${styles.bubble} ${styles.show}`}>{bubble}</div>}
      </div>
      <div className={styles.shield}>
        🔒 <span>صورة ابنك <b>متسيبش موبايلك</b> — بنعمل نسخة كرتونية بس</span>
      </div>
    </div>
  )
}

export default HeroStage
