import React from "react";

export default function PartsTableFooter(props) {

    const { slice, page, range, setPage } = props;

    React.useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1)
        }
    }, [slice, page, setPage])

    const buttonElements = range.map((ele, index) => {
        return (
            <button
                key={index}
                className={`parts-table-btn ${page === ele ? "table-btn-active" : "table-btn-inactive"}`}
                onClick={() => setPage(ele)}
            >
                {ele}
            </button>
        )
    })

    return (
        <div className="parts-table-footer">
            {buttonElements}
        </div>
    )
}