import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import FlexDirection from './components/FlexDiretion/FlexDirection.tsx'
import FlexType from './components/FlexType/FlexType.tsx'
import FlexTypeV from './components/FlexTypeV/FlexTypeV.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="fd" element={<FlexDirection />} />
      <Route path="flextype" element={<FlexType />} />
      <Route path="flextypeV" element={<FlexTypeV />} />
      <Route path="flexdirection" element={<FlexDirection />} />
    </Routes>
  </BrowserRouter>,
)
