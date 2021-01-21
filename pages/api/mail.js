import {nodemailerHook} from "../../src/components/hooks/nodemailerHook"

export default (req, res) => {

    const { eventName,eventDate, eventTime, fName, lName } = req.body;

    const  text = `
    захід: ${eventName} ;
    дата проведення: ${eventDate} ;
    час проведення: ${eventTime} ;
    контактні дані: ${fName} ${lName} ;
    `
    nodemailerHook({subject:'Реєстрація на захід',text,res})

}