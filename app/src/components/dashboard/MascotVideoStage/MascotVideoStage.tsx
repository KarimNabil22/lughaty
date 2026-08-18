import MascotIcon from '../../icons/MascotIcon'
import styles from './MascotVideoStage.module.css'

interface MascotVideoStageProps {
  letter: string
  emoji?: string
}

function MascotVideoStage({ letter, emoji }: MascotVideoStageProps) {
  return (
    <div>
      <div className={styles.stage}>
        <span className={styles.badge}>🎬 نوري</span>
        <span className={styles.mascot}>
          <MascotIcon />
        </span>
        <div className={styles.morphStage}>
          <span className={styles.morphLetter}>{letter}</span>
          <span className={styles.morphEmoji}>{emoji ?? '⭐'}</span>
        </div>
      </div>
      <p className={styles.note}>فيديو الأنيميشن الحقيقي جاي قريب ✨ (ده مكان مؤقت)</p>
    </div>
  )
}

export default MascotVideoStage
