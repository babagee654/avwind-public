import { Link } from "react-router-dom"

export default function MobileMenu(props) {

    return (
        <div className={`navbar-menu ${props.showMenu ? "" : "hidden"}`}>
            <Link to="/commercial" className="nav-link">Commercial</Link>
            <Link to="/military" className="nav-link">Military</Link>
            <Link to="/company-info" className="nav-link">Company Info</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link>
        </div>
    )

}