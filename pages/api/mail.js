const nodemailer = require("nodemailer");
export default (req, res) => {

    const { eventName,eventDate, eventTime, fName, lName } = req.body;

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
        subject: `Реєстрація на захід`,
        text: `
    захід: ${eventName} ;
    дата проведення: ${eventDate} ;
    час проведення: ${eventTime} ;
    контактні дані: ${fName} ${lName} ;
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