import React from 'react'
import './CommonTabs.css'

interface CommonTabsProps {
  options: string[]
  label?: string
  activeValue: string
  onValueChange?: (value: string) => void
  className?: string
  style?: React.CSSProperties
}

export default function CommonTabs({
  options,
  label,
  activeValue,
  onValueChange,
  className = '',
  style,
}: CommonTabsProps) {
  return (
    <div className={`ct-tab-container ${className}`} style={style}>
      <div className="ct-tab-inner">
        <div className="ct-tab-button">
          {label && <div className="ct-dec">{label}</div>}
          <div className="ct-items">
            {
              options.map(option => (
                <button
                  key={option}
                  className={`ct-btn ${option === activeValue ? 'active' : ''}`}
                  onClick={() => onValueChange?.(option)}
                  aria-selected={option === activeValue}
                >
                  <span className={`ct-tab-label ${option === activeValue ? 'active' : 'inactive'}`}>{option}</span>
                  <div className={`ct-bottomLine ${option === activeValue ? 'active' : 'inactive'}`} />
                </button>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
