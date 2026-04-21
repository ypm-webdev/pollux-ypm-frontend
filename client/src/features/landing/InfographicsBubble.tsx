import React from 'react'
import sanitizeHtml from 'sanitize-html'

import Tooltip from '../common/Tooltip'

interface IProps {
  icon: string
  number: number
  label: string
  link: string
  idx: number
  total: number
  description?: string
}

const InfographicsBubble: React.FC<IProps> = ({
  icon,
  number,
  label,
  link,
  idx,
  total,
  description,
}) => {
  const bubbleContent = (
    <a className="bubbles__link" href={link}>
      <img className="bubbles__icon" src={icon} alt={label} />
      <div className="bubbles__number">{number.toLocaleString()}</div>
      <div className="bubbles__label">{label}</div>
    </a>
  )

  if (description) {
    return (
      <li
        className="bubbles__item"
        style={{ '--item-count': idx } as React.CSSProperties}
      >
        <Tooltip
          html={sanitizeHtml(description, {
            allowedTags: ['p', 'br', 'strong', 'em', 'a'],
          })}
          placement="top"
        >
          {bubbleContent}
        </Tooltip>
      </li>
    )
  }

  return (
    <li
      className="bubbles__item"
      style={{ '--item-count': idx } as React.CSSProperties}
    >
      {bubbleContent}
    </li>
  )
}

export default InfographicsBubble
