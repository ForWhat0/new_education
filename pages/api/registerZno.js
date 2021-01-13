const nodemailer = require("nodemailer");
export default (req, res) => {

    const {  name, phone , email , comment , learn } = req.body;

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
        subject: `Реєстрація на курси підготовки до ЗНО`,
        text: `
    ім'я: ${name} ;
    телефон: ${phone} ;
    email: ${email} ;
    коментар: ${comment} ;
    предмет: ${learn} ;
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