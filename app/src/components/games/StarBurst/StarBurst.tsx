import { useEffect, useState, type RefObject } from 'react'
import styles from './StarBurst.module.css'

interface StarBurstProps {
  from: { x: number; y: number }
  targetRef?: RefObject<HTMLElement | null>
  count?: number
  onDone: () => void
}

function StarBurst({ from, targetRef, count = 3, onDone }: StarBurstProps) {
  const [flying, setFlying] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setFlying(true))
    const t = setTimeout(onDone, 750)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t)
    }
  }, [onDone])

  const target = targetRef?.current?.getBoundingClientRect()
  const dx = target ? target.left + target.width / 2 - from.x : 0
  const dy = target ? target.top + target.height / 2 - from.y : -80

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={styles.star}
          style={{
            left: from.x - 10,
            top: from.y - 10,
            transform: flying ? `translate(${dx + i * 6}px, ${dy}px) scale(0.5)` : undefined,
            opacity: flying ? 0 : 1,
          }}
        >
          ⭐
        </span>
      ))}
    </>
  )
}

export default StarBurst
