import { nanoid } from 'nanoid'
import React from 'react'
import useTable from '../../../hooks/useTable'
import PartsTableFooter from './PartsTableFooter'

export default function PartsTable(props) {
    const { parts } = props

    const [searchTerm, setSearchTerm] = React.useState('')
    const [filteredData, setFilteredData] = React.useState(parts)

    React.useEffect(() => {
        // For DB, Make sure part # is a string to use filter method.
        const filteredParts = parts.filter(val => {
            const filterItem = val.ProductName.toString().toLowerCase()
            if (searchTerm === "") {
                return val
            } else if (filterItem.includes(searchTerm.toLowerCase())) {
                return val
            } else {
                return null
            }
        })
        setFilteredData(filteredParts)
    }, [searchTerm, parts])




    // Implementing table footer pages
    let rowsPerPage = 20;
    const [page, setPage] = React.useState(1);
    const { slice, range } = useTable(filteredData, page, rowsPerPage)

    // Render the filtered + sliced  data as elements.
    const partsElements = slice.map(part => {
        return (
            <tr key={nanoid()}>
                <td>{part.ProductName}</td>
                <td>{part.Description}</td>
            </tr>
        )
    })

    return (
        <div className='parts-search'>
            <input type="text" placeholder="Search by part #" onChange={event => { setSearchTerm(event.target.value) }} />
            <table className='parts-table'>
                <thead>
                    <tr>
                        <th>Part Number</th>
                        <th>Description</th>
                    </tr>
                </thead>
                {searchTerm && <tbody>
                    {partsElements}
                </tbody>}
            </table>
            {searchTerm && <PartsTableFooter
                range={range}
                slice={slice}
                setPage={setPage}
                page={page}
            />}
        </div>
    )
}