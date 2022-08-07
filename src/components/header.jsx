import React from 'react'
import Logo from '../img/logo.png'
import '../scss/header.css'
function header() {
  return (
    <>
      <div className="header">
        <img className="logoimg" src={Logo} alt="" srcset="" />
      </div>

    </>
  )
}

export default header