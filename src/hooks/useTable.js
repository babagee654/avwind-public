import React from "react"

// Calculates how many pages of table
const calculateRange = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage)
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range
}

const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
}

const useTable = (data, page, rowsPerPage) => {
    const [tableRange, setTableRange] = React.useState([])
    const [slice, setSlice] = React.useState([])

    //  Update slice and tableRange whenever data, page, or the setter functions are called,
    React.useEffect(() => {
        const range = calculateRange(data, rowsPerPage);
        setTableRange([...range]);

        const slice = sliceData(data, page, rowsPerPage)
        setSlice([...slice]);

    }, [data, setTableRange, page, setSlice, rowsPerPage])

    return { slice, range: tableRange };
}

export default useTable;