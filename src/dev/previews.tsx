import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox'
import FlexTypeV from '../components/FlexTypeV/FlexTypeV.tsx'
import { PaletteTree } from './palette'

function ComponentPreviews() {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/FlexTypeV">
        <FlexTypeV />
      </ComponentPreview>
    </Previews>
  )
}

export default ComponentPreviews
