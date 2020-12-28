import MainHeader from "../headers/mainHeader";
import {FooterWrapper, Logos, Text,Company} from "./footerStyled";
import {useRouter} from "next/router";

export const PageFooter = ({menu,contacts})=>{
    const router = useRouter()
    const locale = router.locale
    const telegram = contacts?.telegramLink && contacts.telegramLink
    const facebook = contacts?.facebookLink && contacts.facebookLink
    const gmail = contacts?.gmail && contacts.gmail
    const adress = contacts?.adress && contacts.adress
    const phoneNumber = contacts?.phoneNumber && contacts.phoneNumber
    const group = contacts?.group && contacts.group
    const authorship = contacts?.authorship && contacts.authorship
    return(
        <FooterWrapper >
            <MainHeader footer={true} menu={menu} whiteTheme={true}/>
            <Logos telegram={telegram} gmail={gmail} facebook={facebook}/>
            <Text locale={locale} adress={adress} phoneNumber={phoneNumber} gmail={gmail} group={group} />
            <Company locale={locale} authorship={authorship}/>
        </FooterWrapper>
    )
}