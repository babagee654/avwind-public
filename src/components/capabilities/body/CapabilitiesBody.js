import { Link } from "react-router-dom"

export default function CapabilitiesBody(props) {
    return (
        <div className='page-description'>
            <p>
                {props.bodyText}
            </p>
            <Link className="btn banner-btn" to="/contact">Request a quote</Link>
        </div>
    )
}