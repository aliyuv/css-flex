import './App.css'
import {Link, NavLink} from "react-router";

function App() {

  return (
    <>
        <nav>
            <NavLink to="/">主页</NavLink>
            <Link to="/flextype">案列1</Link>
            <Link to="/flexdirection">案列2</Link>
        </nav>
    </>
  )
}

export default App
