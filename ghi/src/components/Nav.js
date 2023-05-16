import React from 'react'

const Nav = () => {
     return (
    <nav className="bg-black">
        <ul className="navbar-nav me-auto ml-auto d-flex flex-wrap mb-2 mb-lg-0">
            <li className="nav-item dropdown">
                <div className="nav-link active" aria-current="page" to="/manufacturers">Manufacturers</div>
            </li>
        </ul>
    </nav>
  )
}

export default Nav