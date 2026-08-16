import CartoonHeroIcon from '../../icons/CartoonHeroIcon'
import { heroColor } from '../../../data/heroPresets'
import styles from './HeroAvatar.module.css'

interface HeroAvatarProps {
  heroKey: string
  size?: 'sm' | 'lg'
}

function HeroAvatar({ heroKey, size = 'sm' }: HeroAvatarProps) {
  const classes = [styles.avatar, size === 'lg' ? styles.lg : ''].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      <CartoonHeroIcon color={heroColor(heroKey)} />
    </div>
  )
}

export default HeroAvatar
