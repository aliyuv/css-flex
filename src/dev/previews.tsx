import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox'
import FlexTypeV from '../components/FlexTypeV/FlexTypeV.tsx'
import { PaletteTree } from './palette'
import GridArea from "../components/GridArea/GridArea.tsx";

function ComponentPreviews() {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/FlexTypeV">
        <FlexTypeV />
      </ComponentPreview>
      <ComponentPreview path="/GridArea">
        <GridArea/>
      </ComponentPreview>
    </Previews>
  )
}

export default ComponentPreviews
