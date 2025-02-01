import { useState } from 'react'
import LayoutBox from '../common/LayoutBox/LayoutBox.tsx'
import LayoutContainer from '../common/layoutContainer/LayoutContainer.tsx'
import Switch from '../common/switch/Switch.tsx'
import CommonTabs from '../common/tabs/CommonTabs.tsx'
import './ContentJustify.css'

export default function ContentJustify() {
  const renderArr = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']
  const justifyItemsArr = ['stretch', 'start', 'center', 'end']
  const [jiActiveTab, setJiActiveTab] = useState('stretch')
  const [activeTab, setActiveTab] = useState('start')
  const [isOn, setIsOn] = useState(false)
  const handleIsOnChange = () => {
    setIsOn(prevState => !prevState)
  }

  return (
    <>
      <LayoutContainer>
        <CommonTabs props={renderArr} dec="justify-content:" onChange={setActiveTab} activeTab={activeTab} />
        <CommonTabs props={justifyItemsArr} dec="justify-items:" onChange={setJiActiveTab} activeTab={jiActiveTab} />
        <LayoutBox isOn={isOn} activeTab={activeTab} jiActiveTab={jiActiveTab} displayCount={true} />
        <Switch handleIsOnChange={handleIsOnChange} isOn={isOn} />
      </LayoutContainer>
    </>
  )
}
