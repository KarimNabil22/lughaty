import Button from '../../ui/Button'
import Reveal from '../../ui/Reveal'
import type { AuthTab } from '../../AuthModal/AuthModal'
import styles from './Pricing.module.css'

interface PricingProps {
  onOpenAuth: (tab: AuthTab) => void
}

const PLANS = [
  {
    name: 'مجاني',
    price: '٠',
    unit: 'جنيه',
    features: ['باقة دروس تجريبية', 'أبطال كرتونية جاهزة', 'ألعاب أساسية'],
    cta: 'ابدأ دلوقتي',
    variant: 'ghost' as const,
    popular: false,
  },
  {
    name: 'الأساسية',
    price: '٩٩',
    unit: 'ج / شهر',
    features: ['كل الفيديوهات الكرتونية', 'كل الألعاب والمستويات', 'تقارير تقدّم لولي الأمر', 'بدون إعلانات'],
    cta: 'اشترك',
    variant: 'primary' as const,
    popular: true,
  },
  {
    name: 'بريميوم',
    price: '١٩٩',
    unit: 'ج / شهر',
    features: ['كل مميزات الأساسية', 'بطل كرتوني شبه ابنك', 'رصيد فيديوهات مخصّصة شهريًا', 'أولوية في الدعم'],
    cta: 'اشترك',
    variant: 'ghost' as const,
    popular: false,
  },
]

function Pricing({ onOpenAuth }: PricingProps) {
  return (
    <section id="pricing" className={styles.pricing}>
      <div className="wrap">
        <Reveal className={styles.secHead}>
          <div className={styles.eye}>الباقات</div>
          <h2>ابدأ ببلاش، وطوّر لما يعجبك</h2>
          <p>أسعار مبدئية — بالجنيه المصري.</p>
        </Reveal>
        <div className={styles.plans}>
          {PLANS.map((plan) => (
            <Reveal key={plan.name} className={`${styles.plan} ${plan.popular ? styles.pop : ''}`}>
              {plan.popular && <span className={styles.poptag}>الأكثر اختيارًا</span>}
              <h3>{plan.name}</h3>
              <div className={styles.price}>
                {plan.price} <span>{plan.unit}</span>
              </div>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>
                    <span className={styles.ck}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.variant} onClick={() => onOpenAuth('signup')}>
                {plan.cta}
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
