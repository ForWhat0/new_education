import {nodemailerHook} from "../../src/components/hooks/nodemailerHook";

export default ( req , res ) => {

    const {  fName, lName, reason ,phone} = req.body;

      const  text = `
    контактні дані: ${fName} ${lName} ;
    телефон: ${phone} ;
    причина звернення: ${reason.label} ;
    `
    nodemailerHook({subject:'Звернення',text,res})

}