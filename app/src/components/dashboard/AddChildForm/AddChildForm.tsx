import { useState } from 'react'
import Button from '../../ui/Button'
import HeroAvatar from '../HeroAvatar/HeroAvatar'
import { HERO_PRESETS } from '../../../data/heroPresets'
import styles from './AddChildForm.module.css'

interface AddChildFormProps {
  onSubmit: (name: string, heroKey: string) => Promise<void>
  onCancel?: () => void
}

function AddChildForm({ onSubmit, onCancel }: AddChildFormProps) {
  const [name, setName] = useState('')
  const [heroKey, setHeroKey] = useState(HERO_PRESETS[0].key)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    if (!name.trim()) {
      setError('اكتب اسم الطفل الأول')
      return
    }
    setError(null)
    setLoading(true)
    try {
      await onSubmit(name.trim(), heroKey)
    } catch {
      setError('حصلت مشكلة، جرّب تاني')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.card}>
      <h3>ضيف طفلك الأول</h3>
      <p className={styles.hint}>اختار بطل كرتوني جاهز، واكتب اسم طفلك.</p>

      <div className={styles.heroGrid}>
        {HERO_PRESETS.map((hero) => (
          <button
            key={hero.key}
            type="button"
            className={`${styles.heroOption} ${heroKey === hero.key ? styles.selected : ''}`}
            onClick={() => setHeroKey(hero.key)}
            aria-label={hero.label}
          >
            <HeroAvatar heroKey={hero.key} />
          </button>
        ))}
      </div>

      <div className={styles.field}>
        <label htmlFor="child-name">اسم الطفل</label>
        <input
          id="child-name"
          type="text"
          placeholder="مثلاً يوسف"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.actions}>
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} disabled={loading}>
            إلغاء
          </Button>
        )}
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'لحظة...' : 'يلا نبدأ 🎉'}
        </Button>
      </div>
    </div>
  )
}

export default AddChildForm
