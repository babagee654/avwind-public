import { Link } from "react-router-dom"
import NavbarLogo from "../../imgs/NavbarLogo.png"
import React from "react"
import CustomLink from "./CustomLink"

export default function Navbar(props) {


    return (
        <nav className='navbar'>
            <div className="navbar-logo">
                <Link to="/" className="nav-link">
                    <img src={NavbarLogo} alt="avwind-home" className="navbar-logo-img"></img>
                </Link>
            </div>

            <button className="menu-btn" onClick={props.toggleMenu}>
                <div className="burger-btn"></div>
                <div className="burger-btn"></div>
                <div className="burger-btn"></div>
            </button>

            <div className="navbar-page-links">
                <CustomLink to="/commercial">Commercial</CustomLink>
                <CustomLink to="/military">Military</CustomLink>
                <CustomLink to="/company-info">Company Info</CustomLink>
                <div className="navbar-contact">
                    <CustomLink to="/contact">Contact Us</CustomLink>
                </div>
            </div>
        </nav>
    )
}