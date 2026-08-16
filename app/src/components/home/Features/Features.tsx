import Reveal from '../../ui/Reveal'
import styles from './Features.module.css'

const FEATURES = [
  { bg: '#FFE9C2', icon: '🎬', title: 'فيديوهات تعليمية', text: 'حروف وقراءة بالعامية المصرية، مقسّمة من الحضانة لسادسة ابتدائي.' },
  { bg: '#D7F3EF', icon: '🕹️', title: 'ألعاب متنوّعة', text: 'تتبّع الحروف، نطّ البالونات، غرف الهروب، المطاردة، لعبة الذاكرة.' },
  { bg: '#FFDAD2', icon: '🗣️', title: 'عامية مصرية', text: 'شرح بلهجة الطفل بيفهمها، مش فصحى جافة.' },
  { bg: '#E7DEF7', icon: '📊', title: 'تقارير لولي الأمر', text: 'تابع نجوم ابنك وتقدّمه في كل مهارة.' },
  { bg: '#DDEEDD', icon: '🔒', title: 'آمن وخاص', text: 'مفيش إعلانات، مفيش مشاركة عامة، وبيانات الطفل محمية.' },
  { bg: '#FFE9C2', icon: '🏆', title: 'مكافآت وتحفيز', text: 'نجوم وشارات ومستويات بتفتح، عشان الطفل يكمّل.' },
]

function Features() {
  return (
    <section id="features">
      <div className="wrap">
        <Reveal className={styles.secHead}>
          <div className={styles.eye}>المميزات</div>
          <h2>مش بس فيديوهات — تجربة تعليمية كاملة</h2>
        </Reveal>
        <div className={styles.feats}>
          {FEATURES.map((f) => (
            <Reveal key={f.title} className={styles.feat}>
              <div className={styles.fico} style={{ background: f.bg }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
