import { useState } from 'react'
import { WORLDS } from '../../../data/worlds'
import styles from './LevelMap.module.css'

function LevelMap() {
  const [worldId, setWorldId] = useState(WORLDS[0].id)
  const [toast, setToast] = useState<string | null>(null)
  const world = WORLDS.find((w) => w.id === worldId) ?? WORLDS[0]

  function handleLevelClick(label: string) {
    setToast(`لعبة "${label}" جاية قريبًا 🚧`)
    setTimeout(() => setToast(null), 2000)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs}>
        {WORLDS.map((w) => (
          <button
            key={w.id}
            className={`${styles.tab} ${w.id === worldId ? styles.activeTab : ''}`}
            onClick={() => setWorldId(w.id)}
          >
            <span>{w.icon}</span> {w.title}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {world.levels.map((level, i) => (
          <button key={level.id} className={styles.node} onClick={() => handleLevelClick(level.label)}>
            <span className={styles.nodeLabel}>{level.label}</span>
            <span className={styles.stars}>☆☆☆</span>
            <span className={styles.nodeNum}>{i + 1}</span>
          </button>
        ))}
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  )
}

export default LevelMap
