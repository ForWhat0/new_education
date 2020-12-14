import MainHeader from "../headers/mainHeader";
import {FooterWrapper, Logos, Text,Company} from "./footerStyled";

export const PageFooter = ({telegram,facebook,gmail})=>{
    return(
        <FooterWrapper >
            <MainHeader whiteTheme={true}/>
            <Logos telegram={telegram} facebook={facebook} gmail={gmail}/>
            <Text/>
            <Company/>
        </FooterWrapper>
    )
}