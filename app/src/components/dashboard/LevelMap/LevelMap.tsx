import { useState } from 'react'
import { WORLDS, type Level } from '../../../data/worlds'
import LevelPlayer from '../LevelPlayer/LevelPlayer'
import styles from './LevelMap.module.css'

function starLabel(n: number) {
  return '⭐'.repeat(n) + '☆'.repeat(3 - n)
}

function LevelMap() {
  const [worldId, setWorldId] = useState(WORLDS[0].id)
  const [toast, setToast] = useState<string | null>(null)
  const [stars, setStars] = useState<Record<string, number>>({})
  const [playingLevel, setPlayingLevel] = useState<Level | null>(null)
  const world = WORLDS.find((w) => w.id === worldId) ?? WORLDS[0]

  function handleLevelClick(level: Level) {
    if (level.game) {
      setPlayingLevel(level)
      return
    }
    setToast(`لعبة "${level.label}" جاية قريبًا 🚧`)
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
          <button key={level.id} className={styles.node} onClick={() => handleLevelClick(level)}>
            <span className={styles.nodeLabel}>{level.label}</span>
            <span className={styles.stars}>{starLabel(stars[level.id] ?? 0)}</span>
            <span className={styles.nodeNum}>{i + 1}</span>
          </button>
        ))}
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}

      {playingLevel && (
        <LevelPlayer
          level={playingLevel}
          onExit={() => setPlayingLevel(null)}
          onComplete={(n) => setStars((prev) => ({ ...prev, [playingLevel.id]: n }))}
        />
      )}
    </div>
  )
}

export default LevelMap
