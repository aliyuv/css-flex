import { Link, NavLink } from 'react-router'
import './App.css'
import './assets/font/stylesheet.css'

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">主页</NavLink>
        <Link to="/flextype">案列1</Link>
        <Link to="/flexdirection">案列2</Link>
        <Link to="/flextypev">案列3</Link>
        <Link to="/flexgrow">案例4</Link>
        <Link to="/gridarea">案例5</Link>
        <Link to="/contentjustify">案例6</Link>
      </nav>
    </>
  )
}

export default App
