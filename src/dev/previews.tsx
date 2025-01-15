import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import FlexTypeV from "../components/FlexTypeV.tsx";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}>
      <ComponentPreview path="/FlexTypeV">
        <FlexTypeV/>
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;