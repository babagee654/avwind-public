const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const ADODB = require('node-adodb');
require('dotenv').config()
const port = process.env.PORT || 9000


// console.log(process.env.TESTING);

// Middleware
app.use(express.static(path.join(__dirname, '../build')))
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Establish connection for Microsoft Access
const mdbConnection = process.env.DB || 'Provider=Microsoft.Jet.OLEDB.4.0;Data Source=PATH/TO/.mdb;'
var connection = ADODB.open(mdbConnection)

// Get Data
app.get('/productData', async (req, res) => {
    const data = await connection
        .query('SELECT * FROM tblProduct')
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            console.error(error);
        });
})

app.get('/dashboardData', async (req, res) => {
    const data = await connection
        .query('SELECT * FROM tblPageContent')
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            console.error(error);
        });
})


// Post Data
app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Posting")
    const data = await connection
        .query(`SELECT * FROM tblUser WHERE UserName = "${username}"`)
        .then(data => {
            let validUser = false;
            if (data[0]?.UserName === username && data[0]?.Password === password) {
                validUser = true
            }

            if (validUser) {
                res.send({ token: 'test123' })
            }
            else {
                res.send({
                    error: 'Invalid Credentials'
                })
            }
        })
        .catch(error => {
            console.error(error);
        });
});

app.post("/dashboard", async (req, res) => {
    function createQueryString(formData) {
        // FormData is an array

        // Create arrays, to later format strings with ","
        let switchArray = []
        let whereArray = []

        formData.forEach(element => {
            switchArray.push(`Page_Name = "${element.Page_Name}"`) // Condition
            switchArray.push(`"${element.Body_Content}"`) // Output Value
            whereArray.push(`"${element.Page_Name}"`)
        });

        let switchString = `SWITCH(${switchArray.join(",")})`
        let whereString = `(${whereArray.join(",")})`


        let fullQueryString = `UPDATE tblPageContent SET Body_Content = ${switchString} WHERE Page_Name IN ${whereString}`
        return fullQueryString
    }

    let queryString = createQueryString(req.body)

    const data = await connection
        .query(queryString)
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error(error);
        });
    res.send({ status: "Updated DB" })
})

// nodemailer
// //Test Account
// const emailTransport = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'yvonne4@ethereal.email',
//         pass: 'ewxxK5vdmjnDtWRGQ9'
//     }
// });

// emailTransport.verify((error) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Ready to Send");
//     }
// });

// app.post("/contact", (req, res) => {
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const companyName = req.body.companyName;
//     const email = req.body.email;
//     const phone = req.body.phone;
//     const message = req.body.message;
//     const region = req.body.region;

//     let mailList = [
//         "jerome_acosta@hotmail.com",
//     ]
//     if (region === "eu-asia") {
//         mailList = [
//             "gerome654@hotmail.com",
//         ]
//     }

//     const mail = {
//         from: `AvWind Contact Form <contact@avwind.com>`,
//         to: mailList,
//         envelope: {
//             from: `${email}`,
//             to: `${mailList}`
//         },
//         subject: "Contact Form Submission",
//         html: `
//              <h1>Contact Information</h1>
//              <p>Name: ${firstName} ${lastName}</p>
//              <p>Company: ${companyName}</p>
//              <p>Email: ${email}</p>
//              <p>Phone: ${phone}</p>
//              <h1>Message</h1>
//              <p>Message: ${message}</p>
//              `,
//     };
//     emailTransport.sendMail(mail, (error) => {
//         if (error) {
//             res.json({ status: false });
//             console.log("error sending email")
//         } else {
//             res.json({ status: true });
//         }
//     });
// });

// Serve the React App
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"), err => {
        if (err) {
            console.log(err);
        }
    });
});

app.listen(port, () => {
    console.log("Listening on port", port)
});