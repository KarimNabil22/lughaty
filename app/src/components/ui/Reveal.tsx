import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './Reveal.module.css'

interface RevealProps {
  children: ReactNode
  className?: string
}

function Reveal({ children, className }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const classes = [styles.reveal, visible && styles.in, className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  )
}

export default Reveal
