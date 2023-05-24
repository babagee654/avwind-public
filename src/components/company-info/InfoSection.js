export default function InfoSection(props) {



    return (
        <div className="info-section">
            {!props.visible ?
                <div className="info-header inactive" onClick={() => props.toggleInfoText(props.id)}>
                    <h1>{props.title}</h1>
                </div>
                :
                <div className="info-header" onClick={() => props.toggleInfoText(props.id)}>
                    <h1>{props.title}</h1>
                </div>}
            <div className={`info-body ${props.visible ? "" : "hidden"}`}>
                {props.content}
            </div>
        </div>
    )
}