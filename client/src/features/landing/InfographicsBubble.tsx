import React from 'react'

interface IProps {
  icon: string
  number: number
  label: string
  link: string
  idx: number
  total: number
}

const InfographicsBubble: React.FC<IProps> = ({
  icon,
  number,
  label,
  link,
  idx,
  total,
}) => (
  <li
    className="bubbles__item"
    style={{ '--item-count': idx } as React.CSSProperties}
  >
    <a className="bubbles__link" href={link}>
      <img className="bubbles__icon" src={icon} alt={label} />
      <div className="bubbles__number">{number.toLocaleString()}</div>
      <div className="bubbles__label">{label}</div>
    </a>
  </li>
)

export default InfographicsBubble
