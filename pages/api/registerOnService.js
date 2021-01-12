const nodemailer = require("nodemailer");
export default (req, res) => {

    const { serviceName, fName, lName ,phone } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'rzozyla@gmail.com',
            pass: 'aezakmiaezakmi3004',
        },
    });

    const mailOption = {
        from: `rzozyla@gmail.com`,
        to: `mishutkat@gmail.com`,
        subject: `Реєстрація на послугу`,
        text: `
    послуга: ${serviceName} ;
    контактні дані: ${fName} ${lName} ;
    телефон: ${phone} ;
    `,
    };

    transporter.sendMail(mailOption, (err, data) => {
        if (err) {
            res.send("error" + JSON.stringify(err));
        } else {
            res.send("success");
        }
    });
    res.send("success");
};