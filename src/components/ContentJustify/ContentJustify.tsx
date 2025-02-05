import { useState } from 'react'
import LayoutBox from '../common/LayoutBox/LayoutBox.tsx'
import LayoutContainer from '../common/layoutContainer/LayoutContainer.tsx'
import Switch from '../common/switch/Switch.tsx'
import CommonTabs from '../common/tabs/CommonTabs.tsx'
import './ContentJustify.css'

const JUSTIFY_CONTENT_OPTIONS = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']
const JUSTIFY_ITEMS_OPTIONS = ['stretch', 'start', 'center', 'end']
const JUSTIFY_SELF_OPTIONS = ['stretch', 'start', 'center', 'end']

export default function ContentJustify() {
  const [justifyItemsValue, setJustifyItemsValue] = useState<(typeof JUSTIFY_ITEMS_OPTIONS)[number]>('stretch')
  const [justifyContentValue, setJustifyContentValue] = useState<(typeof JUSTIFY_CONTENT_OPTIONS)[number]>('start')
  const [justifySelfValue, setJustifySelfValue] = useState<string>('stretch')
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [displayJustify, setDisplayJustify] = useState({
    justifyContent: true,
    justifyItems: true,
    justifySelf: true,
  })

  const tabConfigurations = [
    {
      items: JUSTIFY_CONTENT_OPTIONS,
      label: 'justify-content:',
      value: justifyContentValue,
      onChange: setJustifyContentValue,
      style: { display: displayJustify.justifyContent ? `block` : `none` },
    },
    {
      items: JUSTIFY_ITEMS_OPTIONS,
      label: 'justify-items:',
      value: justifyItemsValue,
      onChange: setJustifyItemsValue,
      style: { display: displayJustify.justifyItems ? `block` : `none` },
    },
    {
      items: JUSTIFY_SELF_OPTIONS,
      label: 'justify-self:',
      value: justifySelfValue,
      onChange: setJustifySelfValue,
      style: { display: displayJustify.justifySelf ? `block` : `none` },
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
        activeValue={justifyItemsValue}
        activeItem={justifySelfValue}
        display_justify={displayJustify}
      />

      <Switch
        handleIsOnChange={
          () => setIsSwitchOn(prev => !prev)
        }
        isOn={isSwitchOn}
      />
      <button onClick={() =>
        setDisplayJustify(p => (
          {
            ...p,
            justifyItems: !p.justifyItems,
            justifySelf: !p.justifySelf,
            justifyContent: !p.justifyContent,
          }))}
      >
        Toggle Items
      </button>
    </LayoutContainer>
  )
}
