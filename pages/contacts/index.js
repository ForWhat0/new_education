import client from "../../src/apollo/client"
import {ParcMenu} from "../../src/components/hooks/hooks";
import {TitleForComponent} from "../../src/components/titleForComponent/title";
import styled from "styled-components";
import {MainLayout} from "../../src/components/layouts/mainLayout";
import GET_CONTACTS from "../../src/queries/get_contacts";
import {contactsLsi} from "../../src/Lsi/lsi";
import {IconBackgroundSvg} from "../../src/components/icon/icon";
import {useSelector} from "react-redux";

const Global = styled.div`
    width: 80%;
    padding-bottom: 60px;
    margin-left: 10%;
    background: url(/contactsBackground.svg) no-repeat;
     background-size: contain;
    background-position: center;
     @media screen and (max-width:1300px) {
     background-size: auto;
    background-position: right;
  }
  @media screen and (max-width:500px) {
   width:96%;
   margin-left:2%;
  }
`
const Info = styled.div`
margin-top:70px;
z-index:3;
position: relative;
strong{
margin-right:10px;
}
 @media screen and (max-width:500px) {
   margin-top:30px;
  }
`
const Field = styled.div`
 display: flex;
    align-items: center;
    margin-bottom:30px;
`
const Text = styled.div`
 display: flex;
  flex-wrap: wrap;
   @media screen and (max-width:500px) {
  font-size:14px;
  }
`
const MapContainer = styled.div`
display:flex;
text-align:center;
flex-direction:column;
justify-content:center;
position: absolute;
    top: 0;
    right: 0;
      height: 500px;
      width:700px;
       @media screen and (max-width:1300px) {
  height: 500px;
 position:relative;
  }
   @media screen and (max-width:700px) {
 height:300px;
  }
a{
width:100%;
text-align:center;
margin-top:20px;
}
span{
color:${props=>props.color};
border-bottom:1px solid ${props=>props.color};
}
`
const Map = styled.div`
background:url(/map.svg) no-repeat;
    width: 100%;
    background-size:cover;
    background-position: center;
    height: 100%;   
      @media screen and (max-width:900px) {
  background-size:contain;
  }  
`
 const CircleBackground = styled.div`
   height: 400px;
    z-index: -1;
    background: rgba(0,174,239,0.08);
    width: 400px;
    top: -20px;
    left: -200px;
    border-radius: 50%;
    position: absolute;
    @media screen and (max-width:500px) {
   left: -250px;
  }
`
const Content = styled.div`
height:600px;
position:relative;
 @media screen and (max-width:1300px) {
 height:auto;
 display:flex;
 flex-direction:column;
  }
`
const MapCenter = styled.div`
width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function Home({menu,contacts,locale}) {

    const parsedMenu = ParcMenu(menu)
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    return (
        <MainLayout
            databaseId={contacts.databaseId}
            contacts={contacts}
            menu={parsedMenu}
        >

            <Global>
                <TitleForComponent text={contactsLsi.contacts[locale]}/>
                <Content>
                    <Info>
                        <CircleBackground/>
                        <Field>
                           <IconBackgroundSvg src='/phone.svg'/>
                           <Text>
                               <strong>
                                   {contactsLsi.phoneNumber[locale]}
                               </strong>
                               <span>
                          {contacts?.phoneNumber? contacts.phoneNumber : null}
                        </span>
                           </Text>
                        </Field>
                        <Field>
                            <IconBackgroundSvg src='/mapIcon.svg'/>
                            <Text>
                                <strong>
                                    {contactsLsi.adress[locale]}
                                </strong>
                                <span>
                          {contacts?.adress? contacts.adress : null}
                        </span>
                            </Text>

                        </Field>
                        <Field>
                            <IconBackgroundSvg src='/gmailIcon.svg'/>
                            <Text>
                                <strong>
                                    {contactsLsi.email[locale]}
                                </strong>
                                <span>
                          {contacts?.gmail? contacts.gmail : null}
                        </span>
                            </Text>

                        </Field>
                        <Field>
                            <a href={`https://telegram.im/${contacts?.telegramLink? contacts.telegramLink : null}`}  target="_blank">
                                <IconBackgroundSvg src='/telegramIcon.svg'/>
                            </a>
                            <a href={contacts?.facebookLink? contacts.facebookLink : null} target="_blank">
                                <IconBackgroundSvg src='/facebookIcon.svg'/>
                            </a>
                        </Field>
                    </Info>
                    <MapCenter>
                    <MapContainer
                    color={!visuallyImpairedModeWhiteTheme ? 'white' : 'black'}
                    >
                            <Map/>
                            <a  href={contacts?.mapsLink? contacts.mapsLink : null} target="_blank">
                           <span>
                               {contactsLsi.map[locale]}
                           </span>
                            </a>
                    </MapContainer>
                    </MapCenter>
                </Content>
            </Global>
        </MainLayout>
    )
}
export async function getStaticProps({locale}){
    const contactsUri = locale === "EN" ? "/en/contacts/" : locale === "RU" ? "/ru/kontakty/"  : "/kontakti/"
    const location = locale === "EN" ? "HEADER_MENU___EN" : locale === "RU" ? "HEADER_MENU___RU"  : "HEADER_MENU"
    const { data } = await client.query( {
        query: GET_CONTACTS,
        variables: {
            location,
            contactsUri
        }
    } )

    return {
        props: {
            locale,
            contacts:data?.contacts?.contactsFields ? data.contacts.contactsFields : [],
            menu:data?.menuItems?.nodes ? data.menuItems.nodes : [],
        },
        revalidate: 1
    }
}
