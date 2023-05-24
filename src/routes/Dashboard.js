import React from 'react';
import { useNavigate } from "react-router-dom";


export default function Dashboard(props) {

    // Authenticate user before allowing access.
    let navigate = useNavigate();
    React.useEffect(() => {
        if (!props.LoggedIn) {
            return navigate("/login");
        }
    }, [props.LoggedIn]);

    // Get page content from DB
    React.useEffect(() => {
        async function getDashboard() {
            try {
                const res = await fetch("http://localhost:9000/dashboardData")
                const data = await res.json()
                setFormData(data)

            } catch (error) {
                console.log("Unable to fetch page data")
            }
        }
        getDashboard();
    }, [])



    // Set Form State with Content from DB
    const [formData, setFormData] = React.useState([])
    const [status, setStatus] = React.useState("Update");

    // Since formData is being changed, it is re-rendering tableElements to update

    // Handle form changes
    function handleChange(event, id) {
        const { name, value } = event.target
        setFormData((prevFormData) => {
            return prevFormData.map(x => x.ID === id ? { ...x, [name]: value } : x)
        })
    }
    // On Submit, overwrite the content
    async function updateData(event) {
        event.preventDefault();
        setStatus("Sending...");
        setTimeout(() => { setStatus("Update"); }, 1000)
        let response = await fetch("http://localhost:9000/dashboard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formData),
        });

        let res = await response.json();
        console.log(res.status)
    }

    const tableElements = formData.map((element) => {
        return (
            <tr key={element.ID}>
                <td>
                    <p>{element.Page_Name}</p>
                </td>
                <td>
                    <textarea
                        id="Body_Content"
                        name="Body_Content"
                        onChange={(e) => handleChange(e, element.ID)}
                        value={element.Body_Content}
                        placeholder='Enter body content'
                    />
                </td>
            </tr>
        )
    })

    return (
        <section className='dashboard-container'>
            <h1>Dashboard</h1>
            <form className='dashboard-form' onSubmit={(e) => updateData(e)}>
                <table className='parts-table'>
                    <thead>
                        <tr>
                            <th>Page Name</th>
                            <th>Body Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableElements}
                    </tbody>
                </table>
                <button type="submit">{status}</button>
            </form>
        </section>
    );
}