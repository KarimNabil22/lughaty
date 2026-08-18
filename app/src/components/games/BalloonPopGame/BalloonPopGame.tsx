import { useEffect, useRef, useState } from 'react'
import { otherLetters } from '../../../data/letters'
import { playSfx, vibrate } from '../../../lib/sound'
import styles from './BalloonPopGame.module.css'

const GOAL = 4
const COLORS = ['#E8654B', '#54A878', '#7C6BB0', '#F2B441', '#3FA7C4']
const RISE_HEIGHT = 360

interface Balloon {
  id: number
  letter: string
  color: string
  left: number
  duration: number
  correct: boolean
  risen: boolean
  shaking: boolean
}

interface BalloonPopGameProps {
  letter: string
  onResult: (success: boolean, at: { x: number; y: number }) => void
}

function BalloonPopGame({ letter, onResult }: BalloonPopGameProps) {
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [popped, setPopped] = useState(0)
  const doneRef = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const shakeTimers = useRef(new Set<ReturnType<typeof setTimeout>>())

  useEffect(() => {
    const timers = shakeTimers.current
    return () => {
      timers.forEach(clearTimeout)
      timers.clear()
    }
  }, [])

  useEffect(() => {
    const others = otherLetters(letter, 6)
    doneRef.current = false
    setPopped(0)
    setBalloons([])
    let nextId = 0
    const removeTimers = new Set<ReturnType<typeof setTimeout>>()

    function spawn() {
      const isTarget = Math.random() < 0.5
      const balloonLetter = isTarget ? letter : others[Math.floor(Math.random() * others.length)]
      const id = nextId++
      const duration = 4500 + Math.random() * 2500
      setBalloons((prev) => [
        ...prev,
        {
          id,
          letter: balloonLetter,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          left: 8 + Math.random() * 78,
          duration,
          correct: balloonLetter === letter,
          risen: false,
          shaking: false,
        },
      ])
      requestAnimationFrame(() => {
        setBalloons((prev) => prev.map((b) => (b.id === id ? { ...b, risen: true } : b)))
      })
      const t = setTimeout(() => {
        setBalloons((prev) => prev.filter((b) => b.id !== id))
        removeTimers.delete(t)
      }, duration + 100)
      removeTimers.add(t)
    }

    spawn()
    intervalRef.current = setInterval(spawn, 800)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      removeTimers.forEach(clearTimeout)
    }
  }, [letter])

  function handlePop(balloon: Balloon, x: number, y: number) {
    if (doneRef.current) return
    if (balloon.correct) {
      playSfx('pop')
      vibrate(25)
      setBalloons((prev) => prev.filter((b) => b.id !== balloon.id))
      setPopped((prev) => {
        const next = prev + 1
        if (next >= GOAL) {
          doneRef.current = true
          if (intervalRef.current) clearInterval(intervalRef.current)
          onResult(true, { x, y })
        }
        return next
      })
    } else {
      playSfx('wrong')
      vibrate(40)
      setBalloons((prev) => prev.map((b) => (b.id === balloon.id ? { ...b, shaking: true } : b)))
      const t = setTimeout(() => {
        setBalloons((prev) => prev.map((b) => (b.id === balloon.id ? { ...b, shaking: false } : b)))
        shakeTimers.current.delete(t)
      }, 350)
      shakeTimers.current.add(t)
    }
  }

  return (
    <div>
      <p className={styles.hint}>
        دوس على بالونات حرف «{letter}» بس! ({popped}/{GOAL})
      </p>
      <div className={styles.arena}>
        {balloons.map((b) => (
          <button
            key={b.id}
            className={`${styles.balloon} ${b.shaking ? styles.shake : ''}`}
            style={{
              left: `${b.left}%`,
              bottom: b.risen ? RISE_HEIGHT : -90,
              background: b.color,
              transitionDuration: `${b.duration}ms`,
            }}
            onClick={(e) => handlePop(b, e.clientX, e.clientY)}
          >
            {b.letter}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BalloonPopGame
