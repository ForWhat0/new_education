const nodemailer = require("nodemailer");
export default (req, res) => {

    const {  name, phone , email , comment } = req.body;

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
        subject: `Коментар`,
        text: `
    ім'я: ${name} ;
    телефон: ${phone} ;
    email: ${email} ;
    коментар: ${comment} ;
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