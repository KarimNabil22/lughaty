import Button from '../../ui/Button'
import type { AuthTab } from '../../AuthModal/AuthModal'
import HeroStage from './HeroStage'
import styles from './Hero.module.css'

interface HeroProps {
  onOpenAuth: (tab: AuthTab) => void
}

function Hero({ onOpenAuth }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`wrap ${styles.grid}`}>
        <div>
          <span className={styles.eyebrow}>🇪🇬 بالعامية المصرية · من الحضانة لسادسة ابتدائي</span>
          <h1 className={styles.headline}>
            ابنك يتعلّم العربي <span className={styles.hl}>وهو بطل الحكاية</span>
          </h1>
          <p className={styles.sub}>
            فيديوهات وألعاب تعليمية ممتعة، وابنك نفسه بيتحوّل لبطل كرتوني جوّه القصة — من غير ما صورته
            تسيب موبايلك.
          </p>
          <div className={styles.cta}>
            <Button variant="primary" onClick={() => onOpenAuth('signup')}>
              جرّب مجانًا
            </Button>
            <Button variant="ghost" onClick={() => document.getElementById('how')?.scrollIntoView()}>
              شوف إزاي بيشتغل
            </Button>
          </div>
          <div className={styles.chips}>
            <span className={styles.chip}>🔒 آمن وخاص للأطفال</span>
            <span className={styles.chip}>🎮 ألعاب زي المغامرات</span>
            <span className={styles.chip}>📊 تقارير لولي الأمر</span>
          </div>
        </div>

        <HeroStage />
      </div>
    </section>
  )
}

export default Hero
