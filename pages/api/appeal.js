import { nodemailerHook } from "../../src/components/hooks/nodemailerHook";

export default (req, res) => {
  const { fName, lName, reason, email, textForMail, file } = req.body;

  const text = `
    контактні дані: ${fName} ${lName} ;
    email: ${email} ;
    тип звернення: ${reason.label} ;
    текст звертання ${textForMail} ;
    `;
  nodemailerHook({ subject: "Звернення", text, res, file });
};
