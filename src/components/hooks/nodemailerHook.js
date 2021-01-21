const nodemailer = require("nodemailer")

export const nodemailerHook = ( {subject, text,res} ) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "osvitaSiteKyiv@gmail.com",
            pass: "osvitaSiteKyiv12345",
        },
    });

    const mailOption = {
        from: "osvitaSiteKyiv@gmail.com",
        to: "rzozyla@gmail.com",
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