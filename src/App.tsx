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
      </nav>
    </>
  )
}

export default App
