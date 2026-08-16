import Reveal from '../../ui/Reveal'
import styles from './TrustBand.module.css'

function TrustBand() {
  return (
    <section>
      <Reveal className={styles.trust}>
        <h2>خصوصية ابنك أول أولوية 🔒</h2>
        <p>
          الفكرة إن ابنك يفرح إنه بطل، وأنت مطمّن. عشان كده الصورة الأصلية متسيبش موبايلك، والفيديوهات
          خاصة بحسابك، ومفيش إعلانات ولا مشاركة عامة.
        </p>
        <div className={styles.tgrid}>
          <div className={styles.titem}>🔒 الصورة على جهازك</div>
          <div className={styles.titem}>🚫 بدون إعلانات</div>
          <div className={styles.titem}>👨‍👩‍👧 تحكّم كامل لولي الأمر</div>
        </div>
      </Reveal>
    </section>
  )
}

export default TrustBand
