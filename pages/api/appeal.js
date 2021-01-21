const nodemailer = require("nodemailer");
export default ( req , res ) => {

    const {  fName, lName, reason ,phone} = req.body;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: 'osvitniisitekyiv@gmail.com',
            pass: 'osvitniisitekyiv12345',
        },
    });

    const mailOption = {
        from: `osvitniisitekyiv@gmail.com`,
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