export interface HeroPreset {
  key: string
  color: string
  label: string
}

export const HERO_PRESETS: HeroPreset[] = [
  { key: 'coral', color: '#FF6B54', label: 'الفارس الأحمر' },
  { key: 'teal', color: '#2FB4A6', label: 'البطل الأزرق' },
  { key: 'mango', color: '#F2B441', label: 'النجم الأصفر' },
  { key: 'purple', color: '#7C6BB0', label: 'الساحر البنفسجي' },
  { key: 'green', color: '#54A878', label: 'المغامر الأخضر' },
]

export function heroColor(heroKey: string): string {
  return HERO_PRESETS.find((h) => h.key === heroKey)?.color ?? HERO_PRESETS[0].color
}
