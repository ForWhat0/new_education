import {nodemailerHook} from "../../src/components/hooks/nodemailerHook"

export default (req, res) => {

    const { serviceName, fName, lName ,phone } = req.body;

    const  text = `
    послуга: ${serviceName} ;
    контактні дані: ${fName} ${lName} ;
    телефон: ${phone} ;
    `
    nodemailerHook({subject:'Реєстрація на послугу',text,res})

}