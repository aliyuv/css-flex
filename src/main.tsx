import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import ContentJustify from './components/ContentJustify/ContentJustify.tsx'
import FlexDirection from './components/FlexDiretion/FlexDirection.tsx'
import FlexGrow from './components/FlexGrow/FlexGrow.tsx'
import FlexType from './components/FlexType/FlexType.tsx'
import FlexTypeV from './components/FlexTypeV/FlexTypeV.tsx'
import GridArea from './components/GridArea/GridArea.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="fd" element={<FlexDirection />} />
      <Route path="flextype" element={<FlexType />} />
      <Route path="flextypeV" element={<FlexTypeV />} />
      <Route path="flexdirection" element={<FlexDirection />} />
      <Route path="flexgrow" element={<FlexGrow />} />
      <Route path="gridarea" element={<GridArea />} />
      <Route path="contentjustify" element={<ContentJustify />} />
    </Routes>
  </BrowserRouter>,
)
