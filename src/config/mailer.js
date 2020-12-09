const nodeMailer = require("nodemailer")

// let adminEmail = thuanlvph08370@gmail.com
// let adminPassword = Lt05122000.
// let mailHost = "smtp.gmail.com"
// let mailPort = "587"

let sendMail = (to, subject, htmlContent) => {
    let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // use HTTPS,..=>
        requireTLS:true,
        tls: {
            rejectUnauthorized:false
        },
        auth: {
            user: "thuanlvph08370@fpt.edu.vn",
            pass: "Lt05122000."
        }
    })

    let options = {
        from: "thuanlvph08370@fpt.edu.vn",
        to: to,
        subject: subject,
        html: htmlContent
    }

    return transporter.sendMail(options)
    // reuturn a Promise

}
module.exports = sendMail