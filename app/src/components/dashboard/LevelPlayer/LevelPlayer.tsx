import { useEffect, useRef, useState } from 'react'
import type { Level } from '../../../data/worlds'
import { LETTER_NAMES, wordsForLetter } from '../../../data/letters'
import MascotIcon from '../../icons/MascotIcon'
import MascotVideoStage from '../MascotVideoStage/MascotVideoStage'
import Button from '../../ui/Button'
import ReactionPopup from '../../games/ReactionPopup/ReactionPopup'
import StarBurst from '../../games/StarBurst/StarBurst'
import TraceLetterGame from '../../games/TraceLetterGame/TraceLetterGame'
import BalloonPopGame from '../../games/BalloonPopGame/BalloonPopGame'
import { playSfx, vibrate } from '../../../lib/sound'
import styles from './LevelPlayer.module.css'

type Screen = 'lesson' | 'game' | 'win'

interface LevelPlayerProps {
  level: Level
  onExit: () => void
  onComplete: (stars: number) => void
}

function speak(text: string) {
  try {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ar-EG'
    u.rate = 0.85
    speechSynthesis.cancel()
    speechSynthesis.speak(u)
  } catch {
    // النطق اختياري، لو المتصفح مش بيدعمه منكملش عادي
  }
}

function LevelPlayer({ level, onExit, onComplete }: LevelPlayerProps) {
  const [screen, setScreen] = useState<Screen>('lesson')
  const [reaction, setReaction] = useState<boolean | null>(null)
  const [burstFrom, setBurstFrom] = useState<{ x: number; y: number } | null>(null)
  const [earnedStars, setEarnedStars] = useState(0)
  const badgeRef = useRef<HTMLDivElement>(null)
  const awardedRef = useRef(false)

  const letter = level.letter ?? ''
  const examples = wordsForLetter(letter)
  const letterName = LETTER_NAMES[letter] ?? letter

  useEffect(() => {
    if (screen !== 'win' || awardedRef.current) return
    awardedRef.current = true
    playSfx('win')
    vibrate([30, 40, 30])
    const t1 = setTimeout(() => {
      setBurstFrom({ x: window.innerWidth / 2, y: 200 })
    }, 150)
    const t2 = setTimeout(() => {
      setEarnedStars(3)
      onComplete(3)
    }, 650)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [screen, onComplete])

  function handleGameResult(success: boolean, at: { x: number; y: number }) {
    if (success) {
      playSfx('correct')
      vibrate(30)
      setReaction(true)
      setBurstFrom(at)
      setTimeout(() => setScreen('win'), 700)
    } else {
      playSfx('wrong')
      vibrate([20, 40, 20])
      setReaction(false)
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onExit()
      }}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <button className={styles.exit} onClick={onExit} aria-label="خروج">
            ✕
          </button>
          <div className={styles.title}>{level.label}</div>
          <div className={styles.badge} ref={badgeRef}>
            ⭐ {earnedStars}
          </div>
        </div>

        {screen === 'lesson' && (
          <>
            <div className={styles.panel}>
              <MascotVideoStage letter={letter} emoji={examples[0]?.emoji} />
              <div className={styles.row}>
                <Button variant="primary" onClick={() => speak(letterName)}>
                  🔊 اسمع
                </Button>
              </div>
              {examples.length > 0 && (
                <div className={styles.chips}>
                  {examples.map((ex) => (
                    <button key={ex.word} className={styles.chip} onClick={() => speak(ex.word)}>
                      <span className={styles.em}>{ex.emoji}</span> {ex.word}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.row}>
              <Button variant="primary" onClick={() => setScreen('game')}>
                يلا نلعب ✨
              </Button>
            </div>
          </>
        )}

        {screen === 'game' && level.game === 'trace' && (
          <div className={styles.panel}>
            <TraceLetterGame letter={letter} onResult={handleGameResult} />
          </div>
        )}

        {screen === 'game' && level.game === 'balloon' && (
          <div className={styles.panel}>
            <BalloonPopGame letter={letter} onResult={handleGameResult} />
          </div>
        )}

        {screen === 'win' && (
          <div className={styles.panel}>
            <div className={styles.mascotWrap}>
              <span className={styles.mascotFloat}>
                <MascotIcon />
              </span>
            </div>
            <div className={styles.winTitle}>جاااامد! كسبت 🏆</div>
            <div className={styles.winStars}>⭐⭐⭐</div>
            <div className={styles.winNote}>+٣ نجوم!</div>
            <div className={styles.row}>
              <Button variant="primary" onClick={onExit}>
                ارجع للخريطة ◀️
              </Button>
            </div>
          </div>
        )}
      </div>

      {reaction !== null && <ReactionPopup good={reaction} onDone={() => setReaction(null)} />}
      {burstFrom && (
        <StarBurst from={burstFrom} targetRef={badgeRef} onDone={() => setBurstFrom(null)} />
      )}
    </div>
  )
}

export default LevelPlayer
