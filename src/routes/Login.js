import React from "react"
import { Link } from "react-router-dom"

export default function Login(props) {

    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    })

    const [success, setSuccess] = React.useState(false)

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        let response = await fetch("http://localhost:9000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formData),
        });
        let result = await response.json();
        if (result.token) {
            props.saveToken(result.token)
            setSuccess(true)
        }

        if (result.error) {
            alert(result.error)
        }

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                username: "",
                password: ""
            }
        })
    };

    const loginMsg = (
        <h2 className="success">You are currently logged in. <br></br> <br></br><Link to={"/dashboard"}>View dashboard</Link></h2>
    )

    return (
        <section className='login-container'>
            {success ? loginMsg
                :

                <form className="login-form" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            placeholder="Password"
                            required
                        />
                    </div><button className="btn nav-link form-btn" type="submit">Login</button>
                </form>
            }
        </section>
    )
}