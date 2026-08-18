export type GameKind = 'trace'

export interface Level {
  id: string
  label: string
  letter?: string
  game?: GameKind
}

export interface World {
  id: string
  title: string
  icon: string
  levels: Level[]
}

const KG_LETTERS = [
  'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش',
  'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي',
]

const GRADE1_UNITS = [
  'التهجي البسيط',
  'كلمات قصيرة',
  'الجملة الأولى',
  'القراءة بصوت عالي',
  'قصة قصيرة',
  'الفهم القرائي',
]

export const WORLDS: World[] = [
  {
    id: 'kg-letters',
    title: 'حروف الحضانة',
    icon: '🔤',
    levels: KG_LETTERS.map((letter, i) => ({ id: `kg-${i}`, label: letter, letter, game: 'trace' })),
  },
  {
    id: 'grade1-reading',
    title: 'قراءة أول ابتدائي',
    icon: '📖',
    levels: GRADE1_UNITS.map((unit, i) => ({ id: `g1-${i}`, label: unit })),
  },
]
