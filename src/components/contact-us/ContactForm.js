import React from "react";

const ContactForm = (props) => {

    const [status, setStatus] = React.useState("Submit");
    const [email, setEmail] = React.useState({ sent: false, result: false });

    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        phone: "",
        message: "",
        region: props.region
    })

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const handleSubmit = async (event, region) => {
        event.preventDefault();
        setStatus("Sending...");
        let response = await fetch("http://localhost:9000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formData),
        });
        setStatus("Submit");
        let res = await response.json();
        console.log(res.status)
        setEmail(prev => ({ sent: true, result: res.status }))
    };

    return (

        <div className="form">
            <h1>{props.header}</h1>

            {(email.sent && email.result) && <p className="success">Message has been submitted. We will get back to you shortly!</p>}
            {(email.sent && !email.result) && <p className="fail">Message failed to submit. Please try again or contact us by phone at 905-672-9939</p>}

            <form onSubmit={(event) => handleSubmit(event, props.region)}>
                <div>
                    <label htmlFor="firstName">First Name<span className="required">*</span></label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        onChange={handleChange}
                        value={formData.firstName}
                        placeholder="ex: Jane"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name<span className="required">*</span></label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        onChange={handleChange}
                        value={formData.lastName}
                        placeholder="ex: Doe"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="companyName">Company Name<span className="required">*</span></label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        onChange={handleChange}
                        value={formData.companyName}
                        placeholder="ex: AvWind"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email<span className="required">*</span></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        placeholder="ex: mail@abc.com"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        onChange={handleChange}
                        value={formData.phone}
                        placeholder="+1 123-456-7890"
                    />
                </div>
                <div>
                    <label htmlFor="message">Message<span className="required">*</span></label>
                    <textarea
                        id="message"
                        name="message"
                        onChange={handleChange}
                        value={formData.message}
                        placeholder="Enter your message here."
                        required
                    />
                </div>
                <button className="btn form-btn" type="submit">{status}</button>
            </form>
        </div>


    );
};

export default ContactForm;