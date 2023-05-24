import React from "react"
import Certificate from "./Certificate"
import { nanoid } from "nanoid"

import samplePDF1 from '../../../samplePDFs/sample1.pdf';
import samplePDF2 from '../../../samplePDFs/sample2.pdf';


export default function Certificates(props) {

    const data = [
        { id: 1, title: "FAA BILATERALLY ACCEPTED TRANSPORT CANADA CERTIFICATES", files: [samplePDF1, samplePDF2] },
        { id: 2, title: "REPAIR DESIGN CERTIFICATES", files: [samplePDF1, samplePDF2] },
        { id: 3, title: "EUROPEAN AVIATION AGENCY CERTIFICATE", files: [samplePDF1, samplePDF2] },
    ]

    const dataWithVisible = data.map(obj => ({ ...obj, visible: false }))

    const [certificates, setCertificates] = React.useState(dataWithVisible)

    const certificateElements = certificates.map(cert => {
        return (
            <Certificate
                cert={cert}
                key={nanoid()}
                id={cert.id}
                toggle={toggle}
                visible={cert.visible}
            />
        )
    })

    function toggle(id) {
        setCertificates(prevCertArray => {
            let newCertArray = prevCertArray.map(cert => {
                return cert.id === id ? { ...cert, visible: !cert.visible } : { ...cert }
            })
            return newCertArray
        })
    }

    return (
        <div className="certifications-container">
            <h2>Approvals and Certifications</h2>
            <div className="all-certificates">
                {certificateElements}
            </div>
        </div>
    )
}