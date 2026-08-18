import { useEffect } from 'react'
import MascotIcon from '../../icons/MascotIcon'
import styles from './ReactionPopup.module.css'

interface ReactionPopupProps {
  good: boolean
  onDone: () => void
}

function ReactionPopup({ good, onDone }: ReactionPopupProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 900)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className={styles.overlay}>
      <div className={`${styles.card} ${good ? styles.good : styles.bad}`}>
        <span className={styles.mascot}>
          <MascotIcon />
        </span>
        <span>{good ? 'برافو! 👏' : 'حاول تاني 💪'}</span>
      </div>
    </div>
  )
}

export default ReactionPopup
