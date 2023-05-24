// import parts from '../tempData/commercialdata' // Connect to DB for parts info
import CapabilitiesBanner from '../components/capabilities/banner/CapabilitiesBanner'
import CapabilitiesBody from '../components/capabilities/body/CapabilitiesBody'
import Certificates from '../components/capabilities/certificate/Certificates'
import PartsTable from '../components/capabilities/table/PartsTable'
import airplane from "../imgs/787.jpg"
import React from 'react'

export default function Commercial(props) {

    const [parts, setParts] = React.useState([])
    const [dataUnavailable, setdataUnavailable] = React.useState(false)

    React.useEffect(() => {
        async function getParts() {
            try {
                const res = await fetch("http://localhost:9000/productData")
                const data = await res.json()
                setParts(data)

            } catch (error) {
                console.log("Unable to fetch parts data")
                setdataUnavailable(true)
            }
        }
        getParts();
    }, [])

    return (
        <section className='capabilities-container' >
            <CapabilitiesBanner
                image={airplane}
                header="Commercial"
            />
            <CapabilitiesBody
                bodyText={props.Body_Content}
            />
            <PartsTable
                parts={parts}
            />
            {dataUnavailable && <span className='fail'>Part capabilities search currently unavailable</span>}
            <Certificates
            />
        </section>
    )
}