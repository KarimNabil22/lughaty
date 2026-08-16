import Reveal from '../../ui/Reveal'
import styles from './HeroOptions.module.css'

function HeroOptions() {
  return (
    <section id="options" className={styles.section}>
      <div className="wrap">
        <Reveal className={styles.secHead}>
          <div className={styles.eye}>أبطال الفيديو</div>
          <h2>ابنك البطل… أو بطل كرتوني جاهز</h2>
          <p>أنت تختار اللي يريّحك.</p>
        </Reveal>
        <div className={styles.opts}>
          <Reveal className={`${styles.optcard} ${styles.heroOpt}`}>
            <span className={styles.tag}>مميّز</span>
            <h3>بطل شبه ابنك ⭐</h3>
            <p className={styles.heroText}>بنحوّل صورة ابنك لشخصية كرتونية شبهه، ويبقى هو بطل الفيديوهات.</p>
            <ul>
              <li>✦ شخصية كرتونية مستوحاة من ملامح ابنك</li>
              <li>✦ إحساس إنه بطل قصته بجد</li>
              <li>✦ خصوصية كاملة — الفيديوهات خاصة بحسابك</li>
            </ul>
            <div className={styles.privacy}>🔒 الصورة الأصلية متسيبش موبايلك، وبتتمسح بعد ما الشخصية تتعمل.</div>
          </Reveal>

          <Reveal className={`${styles.optcard} ${styles.plain}`}>
            <span className={`${styles.tag} ${styles.tagPurple}`}>جاهز فورًا</span>
            <h3>أبطال كرتونية جاهزة 🦁</h3>
            <p className={styles.plainText}>مش عايز ترفع صور؟ فيه أبطال كرتونية لطيفة جاهزين على طول.</p>
            <ul>
              <li>✅ من غير أي رفع صور</li>
              <li>✅ نفس الدروس والألعاب بالظبط</li>
              <li>✅ بيشتغل فورًا لكل الأطفال</li>
            </ul>
            <div className={`${styles.privacy} ${styles.privacyPlain}`}>👍 مناسب لأي حد مش عايز يرفع صورة طفله.</div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default HeroOptions
