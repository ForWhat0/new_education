import {nodemailerHook} from "../../src/components/hooks/nodemailerHook"

export default (req, res) => {

    const {  name, phone , email , comment , learn } = req.body;

    const  text = `
    ім'я: ${name} ;
    телефон: ${phone} ;
    email: ${email} ;
    коментар: ${comment} ;
    предмет: ${learn} ;
    `
    nodemailerHook({subject:'Реєстрація на курси підготовки до ЗНО',text,res})

}