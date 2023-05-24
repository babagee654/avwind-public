import { Link } from 'react-router-dom'
import linkImage from "../imgs/787.jpg"

export default function Home(props) {
    return (
        <main className='main-container'>
            <section className="cage-code">
                <p>Cage Code: L00K8</p>
            </section>

            <section className="banner">
                <div className='banner-text'>
                    {props.Body_Content}
                </div>
                <Link className="btn banner-btn" to="/company-info">Learn More</Link>

            </section>
            <section className="homepage-links-container">
                <div className="homepage-link">
                    <Link to="/commercial" className='nav-link'>
                        <img src={linkImage} alt="commercial" className='link-img' />
                        <div className='image-label'>
                            <p className='homepage-link-text'>Commercial</p>
                        </div>
                    </Link>
                </div>
                <div className="homepage-link">
                    <Link to="/military" className='nav-link homepage-image-container'> {/*thumbnail*/}
                        <img src={linkImage} alt="military" className='link-img' />
                        <div className='image-label'>
                            <p className='homepage-link-text'>Military</p>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    )
}