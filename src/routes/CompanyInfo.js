import InfoSection from "../components/company-info/InfoSection"
import React from "react"
import { nanoid } from "nanoid"
import { Link } from "react-router-dom"

export default function CompanyInfo(props) {

    const sampleData = [
        {
            Title: "About Us",
            Section1: "<p>Enter Text Here</p>"
        },
        {
            Title: "FAQS",
            Section1: "<p>Enter Text Here</p>"
        },
        {
            Title: "Purchase Order T&C",
            Section1: "<p>Enter Text Here</p>"
        },
        {
            Title: "Careers",
            Section1: "<p>Enter Text Here</p>"
        },
    ]

    function parseHTML(htmlData) {
        let innerHTML = htmlData
        return <div dangerouslySetInnerHTML={{ __html: innerHTML }}></div>
    }

    const withVisibleData = sampleData.map(obj => {
        return obj.Title === "About Us" ? { ...obj, visible: true, id: nanoid() } : { ...obj, visible: false, id: nanoid() }
    })

    const [infoElements, setInfoElements] = React.useState([]);

    React.useEffect(() => {
        setInfoElements(withVisibleData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function toggleInfoText(id) {
        setInfoElements(prevInfoElements => {
            return prevInfoElements.map(ele => {
                return ele.id === id ? { ...ele, visible: !ele.visible } : ele
            })
        })
    }

    const InfoSectionElements = infoElements.map(section => {
        return <InfoSection
            title={section.Title}
            content={parseHTML(section.Section1)}
            id={section.id}
            visible={section.visible}
            toggleInfoText={toggleInfoText}
            key={nanoid()}
        />
    })

    return (
        <section className='company-info-container' >
            <h1>Company Info</h1>
            <div className="info-section-container">
                {InfoSectionElements}

                <div className="info-section">
                    <Link to={"/contact"} className="nav-link" style={{ color: "#FF9F2F" }}>
                        <div className="info-header inactive">
                            <h1>Contact</h1>
                        </div>
                    </Link>
                </div>

            </div>
        </section>
    )
}