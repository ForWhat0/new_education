import {nodemailerHook} from "../../src/components/hooks/nodemailerHook"

export default (req, res) => {

    const {  name, phone , email , comment } = req.body;

    const  text = `
    ім'я: ${name} ;
    телефон: ${phone} ;
    email: ${email} ;
    коментар: ${comment} ;
    `
    nodemailerHook({subject:'Коментар',text,res})

}