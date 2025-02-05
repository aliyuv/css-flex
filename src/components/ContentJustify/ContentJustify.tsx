import { useState } from 'react'
import LayoutBox from '../common/LayoutBox/LayoutBox.tsx'
import LayoutContainer from '../common/layoutContainer/LayoutContainer.tsx'
import Switch from '../common/switch/Switch.tsx'
import CommonTabs from '../common/tabs/CommonTabs.tsx'
import './ContentJustify.css'

const JUSTIFY_CONTENT_OPTIONS = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']
const JUSTIFY_ITEMS_OPTIONS = ['stretch', 'start', 'center', 'end']
const DISPLAY_JUSTIFY_ITEMS = true

export default function ContentJustify() {
  const [justifyItemsValue, setJustifyItemsValue] = useState<(typeof JUSTIFY_ITEMS_OPTIONS)[number]>('stretch')
  const [justifyContentValue, setJustifyContentValue] = useState<(typeof JUSTIFY_CONTENT_OPTIONS)[number]>('start')
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const tabConfigurations = [
    {
      items: JUSTIFY_CONTENT_OPTIONS,
      label: 'justify-content:',
      value: justifyContentValue,
      onChange: setJustifyContentValue,
    },
    {
      items: JUSTIFY_ITEMS_OPTIONS,
      label: 'justify-items:',
      value: justifyItemsValue,
      onChange: setJustifyItemsValue,
      style: { display: DISPLAY_JUSTIFY_ITEMS ? `block` : `none` },
    },
  ]

  return (
    <LayoutContainer>
      {
        tabConfigurations.map(config => (
          <CommonTabs
            key={config.label}
            options={config.items}
            label={config.label}
            activeValue={config.value}
            onValueChange={config.onChange}
            style={config.style}
          />
        ))
      }

      <LayoutBox
        isOn={isSwitchOn}
        activeTab={justifyContentValue}
        jiActiveTab={justifyItemsValue}
        displayCount={DISPLAY_JUSTIFY_ITEMS}
      />

      <Switch
        handleIsOnChange={
          () => setIsSwitchOn(prev => !prev)
        }
        isOn={isSwitchOn}
      />
    </LayoutContainer>
  )
}
