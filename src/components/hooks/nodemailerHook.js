const nodemailer = require("nodemailer")

export const nodemailerHook = ( {subject, text,res} ) => {

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.FROM_USER_LOGIN,
            pass: process.env.FROM_USER_PASSWORD,
        }
    });
    const mailOption = {
        from: process.env.FROM_USER_LOGIN,
        to: process.env.TO_USER_LOGIN,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOption, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error" + JSON.stringify(err));
        } else {
            console.log("mail send");
            res.send("success");
        }
    });
};