import { Outlet } from 'react-router-dom'
import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import Logo from '../../assets/pngtree-vector-notepad-icon-png-image_3773658-removebg-preview.png'


export default function Layput() {
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-dark-subtle shadow">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">
        <img src={Logo} width={50} alt="" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {/* <NavLink className="nav-link fw-bold  text-white" aria-current="page" to="/home">Home</NavLink> */}
        </li>
        <li className="nav-item">
          <NavLink style={{fontSize:20}} className="nav-link fw-bold  text-primary" aria-current="page" to="/"> Sign in</NavLink>
        </li>
        <li className="nav-item">
          <NavLink style={{fontSize:20}} className="nav-link fw-bold text-primary " aria-current="page" to="/register">Register</NavLink>
        </li>
       

      </ul>
      
    </div>
  </div>
</nav> 
    <Outlet/>
    </>
  )
}
