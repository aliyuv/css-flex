import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import FlexDirection from "./components/FlexDirection.tsx";
import FlexType from "./components/FlexType.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="fd" element={<FlexDirection />} />
            <Route path="flextype" element={<FlexType />}/>
            <Route path="flexdirection" element={<FlexDirection />}/>
        </Routes>
    </BrowserRouter>
)
