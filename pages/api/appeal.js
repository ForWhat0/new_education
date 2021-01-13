const nodemailer = require("nodemailer");
export default (req, res) => {

    const {  fName, lName, reason ,phone} = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'rzozyla@gmail.com',
            pass: 'aezakmiaezakmi3004',
        },
    });

    const mailOption = {
        from: `rzozyla@gmail.com`,
        to: `rzozyla@gmail.com`,
        subject: `Звернення`,
        text: `
    контактні дані: ${fName} ${lName} ;
    телефон: ${phone} ;
    причина звернення: ${reason}
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