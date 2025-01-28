import { useState } from 'react'
import LayoutBox from '../common/LayoutBox/LayoutBox.tsx'
import LayoutContainer from '../common/layoutContainer/LayoutContainer.tsx'
import Switch from '../common/switch/Switch.tsx'
import CommonTabs from '../common/tabs/CommonTabs.tsx'
import './ContentJustify.css'

export default function ContentJustify() {
  const renderArr = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']
  const [activeTab, setActiveTab] = useState('start')
  const [isOn, setIsOn] = useState(false)
  const handleIsOnChange = () => {
    setIsOn(prevState => !prevState)
  }

  return (
    <>
      <LayoutContainer>
        <CommonTabs props={renderArr} dec="justify-content:" onChange={setActiveTab} activeTab={activeTab} />
        <LayoutBox isOn={isOn} />
        <Switch handleIsOnChange={handleIsOnChange} isOn={isOn} />
      </LayoutContainer>
    </>
  )
}
