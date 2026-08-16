interface CartoonHeroIconProps {
  color?: string
}

function CartoonHeroIcon({ color = '#FF6B54' }: CartoonHeroIconProps) {
  return (
    <svg width="70%" viewBox="0 0 120 150" aria-hidden="true">
      <path d="M60 96 L96 120 L96 150 L24 150 L24 120 Z" fill={color} />
      <rect x="44" y="86" width="32" height="26" rx="10" fill="#F4C9A0" />
      <circle cx="60" cy="58" r="30" fill="#F4C9A0" />
      <path
        d="M30 52 Q34 22 60 22 Q86 22 90 52 Q78 40 60 42 Q42 40 30 52Z"
        fill="#3A2B54"
      />
      <circle cx="50" cy="58" r="4.5" fill="#33244F" />
      <circle cx="70" cy="58" r="4.5" fill="#33244F" />
      <path d="M52 70 Q60 76 68 70" stroke="#B5623E" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M60 108 L64 120 L56 120 Z" fill="#F2B441" />
      <text x="60" y="140" fontSize="20" textAnchor="middle" fill="#fff">
        ⭐
      </text>
    </svg>
  )
}

export default CartoonHeroIcon
