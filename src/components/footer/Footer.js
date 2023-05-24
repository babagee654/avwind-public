import { Link } from "react-router-dom"

export default function Footer() {

    let currDate = new Date()
    let year = currDate.getFullYear()

    return (
        <footer className="footer">
            <div>
                <div className="footer-nav">
                    <h3 className="footer-header">Page Links</h3>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/commercial" className="nav-link">Commercial</Link>
                    <Link to="/military" className="nav-link">Military</Link>
                    <Link to="/company-info" className="nav-link">Company Info</Link>
                    <Link to="/contact" className="nav-link">Contact Us</Link>
                </div>
            </div>
            <div>
                <div className="footer-certifications">
                    <h3 className="footer-header">Certifications & Approvals</h3>
                    <Link to="/company-info" className="nav-link">Certifications</Link>
                    <p>EASA Approval # 146.7120</p>
                    <p>Transport Canada AMO # 43-02</p>
                    <p>&copy; {year} AvWind International Inc.</p>
                </div>
            </div>
            <div>
                <div className="footer-contact">
                    <h3 className="footer-header">Contact Info</h3>
                    <a href="tel:905-672-9939" className="nav-link">Phone: 905-672-9939</a>
                    <Link to="/contact" className="nav-link">Email: via Contact Form</Link>
                </div>
            </div>
        </footer>
    )
}