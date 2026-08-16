import Reveal from '../../ui/Reveal'
import styles from './HowItWorks.module.css'

const STEPS = [
  {
    num: '١',
    icon: '📸',
    title: 'ارفع صورة (اختياري)',
    text: 'الصورة تتحوّل لشخصية كرتونية على جهازك، والأصل ما بيطلعش من الموبايل. أو اختار بطل كرتوني جاهز.',
  },
  {
    num: '٢',
    icon: '🎬',
    title: 'الفيديو بيتعمل',
    text: 'ابنك بيلاقي نفسه بطل كرتوني في فيديوهات بتعلّمه الحروف والقراءة بالعامية المصرية.',
  },
  {
    num: '٣',
    icon: '🎮',
    title: 'يتعلّم ويلعب',
    text: 'بعد كل فيديو ألعاب زي المغامرات وغرف الهروب، وأنت تتابع تقدّمه بتقرير بسيط.',
  },
]

function HowItWorks() {
  return (
    <section id="how">
      <div className="wrap">
        <Reveal className={styles.secHead}>
          <div className={styles.eye}>إزاي بيشتغل</div>
          <h2>٣ خطوات وابنك يبقى البطل</h2>
          <p>سهلة على ولي الأمر، ممتعة للطفل.</p>
        </Reveal>
        <div className={styles.steps}>
          {STEPS.map((step) => (
            <Reveal key={step.num} className={styles.step}>
              <div className={styles.num}>{step.num}</div>
              <div className={styles.ico}>{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
