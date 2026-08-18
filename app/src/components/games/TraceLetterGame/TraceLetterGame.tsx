import { useEffect, useRef } from 'react'
import Button from '../../ui/Button'
import { playSfx } from '../../../lib/sound'
import styles from './TraceLetterGame.module.css'

const SIZE = 280
const COVERAGE_TARGET = 0.4

interface TraceLetterGameProps {
  letter: string
  onResult: (success: boolean, at: { x: number; y: number }) => void
}

function TraceLetterGame({ letter, onResult }: TraceLetterGameProps) {
  const bgRef = useRef<HTMLCanvasElement>(null)
  const inkRef = useRef<HTMLCanvasElement>(null)
  const maskDataRef = useRef<Uint8ClampedArray | null>(null)
  const maskTotalRef = useRef(0)

  useEffect(() => {
    const bg = bgRef.current
    const ink = inkRef.current
    if (!bg || !ink) return
    const b = bg.getContext('2d')
    const c = ink.getContext('2d')
    if (!b || !c) return

    c.clearRect(0, 0, SIZE, SIZE)
    b.clearRect(0, 0, SIZE, SIZE)
    b.font = `${SIZE * 0.78}px "Baloo Bhaijaan 2", sans-serif`
    b.textAlign = 'center'
    b.textBaseline = 'middle'
    b.fillStyle = '#e2d4f5'
    b.fillText(letter, SIZE / 2, SIZE / 2 + 6)

    const mask = document.createElement('canvas')
    mask.width = SIZE
    mask.height = SIZE
    const m = mask.getContext('2d')
    if (!m) return
    m.font = b.font
    m.textAlign = 'center'
    m.textBaseline = 'middle'
    m.fillStyle = '#000'
    m.fillText(letter, SIZE / 2, SIZE / 2 + 6)
    const data = m.getImageData(0, 0, SIZE, SIZE).data
    let total = 0
    for (let i = 3; i < data.length; i += 16) if (data[i] > 50) total++
    maskDataRef.current = data
    maskTotalRef.current = total

    c.lineWidth = 22
    c.lineCap = 'round'
    c.lineJoin = 'round'
    c.strokeStyle = '#FF6B54'
  }, [letter])

  function coverageRatio(): number {
    const ink = inkRef.current
    const mask = maskDataRef.current
    if (!ink || !mask) return 0
    const ctx = ink.getContext('2d')
    if (!ctx) return 0
    const inkData = ctx.getImageData(0, 0, SIZE, SIZE).data
    let hit = 0
    for (let i = 3; i < mask.length; i += 16) {
      if (mask[i] > 50 && inkData[i] > 30) hit++
    }
    return maskTotalRef.current ? hit / maskTotalRef.current : 0
  }

  function evaluate(manual: boolean) {
    const ink = inkRef.current
    if (!ink) return
    const r = ink.getBoundingClientRect()
    const at = { x: r.left + r.width / 2, y: r.top + 40 }
    if (coverageRatio() >= COVERAGE_TARGET) {
      onResult(true, at)
    } else if (manual) {
      onResult(false, at)
    }
  }

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const ink = inkRef.current!
    const r = ink.getBoundingClientRect()
    return {
      x: ((e.clientX - r.left) / r.width) * SIZE,
      y: ((e.clientY - r.top) / r.height) * SIZE,
    }
  }

  const drawingRef = useRef(false)
  const lastRef = useRef<{ x: number; y: number } | null>(null)

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    drawingRef.current = true
    lastRef.current = pos(e)
    playSfx('tap')
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return
    const ink = inkRef.current
    const c = ink?.getContext('2d')
    if (!c || !lastRef.current) return
    const p = pos(e)
    c.beginPath()
    c.moveTo(lastRef.current.x, lastRef.current.y)
    c.lineTo(p.x, p.y)
    c.stroke()
    lastRef.current = p
  }

  function handlePointerUp() {
    if (!drawingRef.current) return
    drawingRef.current = false
    evaluate(false)
  }

  function handleClear() {
    playSfx('tap')
    const c = inkRef.current?.getContext('2d')
    c?.clearRect(0, 0, SIZE, SIZE)
  }

  return (
    <div>
      <p className={styles.hint}>امسك بإصبعك وارسم على الحرف لحد ما يكمل ✍️</p>
      <div className={styles.canvasWrap}>
        <canvas ref={bgRef} width={SIZE} height={SIZE} className={styles.bg} />
        <canvas
          ref={inkRef}
          width={SIZE}
          height={SIZE}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => {
            drawingRef.current = false
          }}
        />
      </div>
      <div className={styles.row}>
        <Button variant="ghost" onClick={handleClear}>
          ↺ امسح
        </Button>
        <Button variant="primary" onClick={() => evaluate(true)}>
          ✅ خلّصت
        </Button>
      </div>
    </div>
  )
}

export default TraceLetterGame
