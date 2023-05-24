import React from "react"
import ContactForm from "../components/contact-us/ContactForm"

export default function Contact(props) {

    return (
        <section className='contact-container' >
            <h1>Contact Us</h1>
            <p>{props.Body_Content}</p>
            <div className="forms-container">
                <ContactForm
                    header="The Americas"
                    region="americas"
                />
                <div className="separator"></div>
                <ContactForm
                    header="Europe/Asia"
                    region="eu-asia"
                />
            </div>
        </section>
    )
}