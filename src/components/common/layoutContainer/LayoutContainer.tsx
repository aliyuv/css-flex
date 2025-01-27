import type { ReactNode } from 'react'
import './LayoutContainer.css'

export default function LayoutContainer({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="lc-contaniner">
        <div className="lc-inner-box">
          {children}
        </div>
      </div>
    </>
  )
}
