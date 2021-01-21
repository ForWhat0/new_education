const nodemailer = require("nodemailer")

export const nodemailerHook = ( {subject, text,res} ) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.FROM_USER_LOGIN,
            pass: process.env.FROM_USER_PASSWORD,
        },
    });

    const mailOption = {
        from: process.env.FROM_USER_LOGIN,
        to: process.env.TO_USER_LOGIN,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOption, (err, data) => {
        if (err) {
            res.send("error" + JSON.stringify(err));
        } else {
            res.send(`${process.env.FROM_USER_LOGIN},${process.env.FROM_USER_PASSWORD},${process.env.TO_USER_LOGIN}`);
        }
    });
    res.send(`${process.env.FROM_USER_LOGIN},${process.env.FROM_USER_PASSWORD},${process.env.TO_USER_LOGIN}`);
};