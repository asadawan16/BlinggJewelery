import React from 'react'
import logo from '../../assets/logo-regular.png'
import './footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <footer>
        <div className="container">

    <div className="logo">
        <img src={logo} alt="" />
    </div>
    <ul className="footer-list">
        <h2 className="footer-heading">About us</h2>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
    </ul>
    <ul className="footer-list">
        <h2 className='footer-heading'>Shop</h2>
        <li><Link to="/products">Rings</Link ></li>
        <li><Link to="/products">Bracelets</Link ></li>
        <li><Link to="/products">Earings</Link ></li>
        <li><Link to="/products">Necklaces</Link ></li>
    </ul>
    <ul className="footer-list">
        <h2 className='footer-heading'>Address</h2>
        <li>123 Fifth Avenue, New York,</li>
        <li>NY 10160</li>
        <li>929-242-6868</li>
    </ul>
        </div>
        <div className="footer-bottom">
            <span>Copyright © 2024 Blingg Jewelry | Powered by Blingg Jewelry</span>
        </div>
   </footer> 
  )
}

export default Footer