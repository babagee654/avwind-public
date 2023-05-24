import React, { useState } from "react";
import { Document, Page } from "react-pdf";

export default function AllPages(props) {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const { pdf } = props;

    const styles = StyleSheet.create({
        page: { width: 50 },
    });

    return (
        <Document
            file={pdf}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
        >
            {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} style={styles.page} />
            ))}
        </Document>
    );
}