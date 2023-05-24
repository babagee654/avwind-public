import { nanoid } from "nanoid"
import SinglePage from '../../pdf/single-page';


export default function Certificate({ cert, toggle, id, visible }) {
    return (
        <div className="certificate-imgs">
            <h4 onClick={() => toggle(id)}>
                {cert.title} {visible ? <i className="arrow down"></i> : <i className="arrow right"></i>}
            </h4>
            {
                visible && cert.files.map(pdf => {
                    return (
                        <div className="pdf-canvas">

                            <SinglePage pdf={pdf} key={nanoid()} />

                        </div>
                    )
                })
            }
        </div>
    )
}