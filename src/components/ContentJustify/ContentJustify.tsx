import { useState } from 'react'
import LayoutContainer from '../common/layoutContainer/LayoutContainer.tsx'
import CommonTabs from '../common/tabs/CommonTabs.tsx'
import './ContentJustify.css'

export default function ContentJustify() {
  const renderArr = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']
  const [activeTab, setActiveTab] = useState('start')
  return (
    <>
      <LayoutContainer>
        <CommonTabs props={renderArr} dec="justify-content:" onChange={setActiveTab} activeTab={activeTab} />
      </LayoutContainer>
    </>
  )
}
