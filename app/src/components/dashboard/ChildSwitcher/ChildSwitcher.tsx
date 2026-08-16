import type { Child } from '../../../lib/children'
import HeroAvatar from '../HeroAvatar/HeroAvatar'
import styles from './ChildSwitcher.module.css'

interface ChildSwitcherProps {
  children: Child[]
  activeId: string
  onSelect: (id: string) => void
  onAddChild: () => void
}

function ChildSwitcher({ children, activeId, onSelect, onAddChild }: ChildSwitcherProps) {
  return (
    <div className={styles.switcher}>
      {children.map((child) => (
        <button
          key={child.id}
          className={`${styles.item} ${child.id === activeId ? styles.active : ''}`}
          onClick={() => onSelect(child.id)}
        >
          <HeroAvatar heroKey={child.hero_key} />
          <span>{child.name}</span>
        </button>
      ))}
      <button className={styles.addBtn} onClick={onAddChild} aria-label="ضيف طفل">
        +
      </button>
    </div>
  )
}

export default ChildSwitcher
