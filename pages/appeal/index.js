import styled from 'styled-components'
import {TitleForComponent} from "../../src/components/titleForComponent/title";
import client from "../../src/apollo/client";
import GET_NEWS from "../../src/queries/getNews";
import GET_MENU_AND_CONTACTS from "../../src/queries/getMenuAndContacts";
import {MainLayout} from "../../src/components/layouts/mainLayout";
import React, {useState} from "react";
import {ParcMenu, registerOnEventHook, sendAppeal, sendMail} from "../../src/components/hooks/hooks";
import {InputStyled} from "../../src/components/input/input";
import {appeal, leftComment, leftCommentZno} from "../../src/Lsi/lsi";
import {InputsFields, Label, Select} from "../../src/components/leftComment/leftCommentStyLedComponents";
import {SendButton} from "../../src/components/sendButton/sendButton";
import {ShowAlert} from "../../src/redux/actions/actions";
import {useMutation} from "@apollo/client";
import SEND_COMMENT from "../../src/mutations/sendComment";
import {useDispatch, useSelector} from "react-redux";

const Global = styled.div`

`
const Content = styled.div`
color:black;
position: relative;
   display:flex;
   justify-content:center;
   align-items:center;
    width: 100%;
    height: 836px;
   
  @media screen and (max-width:950px) {
    background: #F7F7F7;
    flex-direction: column;
    justify-content: unset;
    align-items: unset;
    height: unset;
    padding-bottom: 40px;
  }
`
const PaperPlane = styled.div`
        background: url(/paperPlane.svg) no-repeat;
    width: 230px;
    height: 175px;
    position: absolute;
    right: 10%;
    top: 0;
    z-index: 2;
    @media screen and (max-width:950px) {
   width: 80px;
    height: 60px;
    right: 2%;
    background-size: contain;
    top: 80px;
  }
`
const ThreadTop = styled.div`
    background: url(/threadTop.svg);
    width: 463px;
    height: 214px;
    position: absolute;
    right: 10%;
    top: 17px;
    z-index: 1;
    margin-right: 155px;
     @media screen and (max-width:950px) {
  display:none;
  }
}
`
const GrayBackground = styled.div`
    position: absolute;
    width: 80%;
    top: 72px;
    left: 0;
    background: #F7F7F7;
    height: 580px;
    @media screen and (max-width:950px) {
     position: relative;
    height: auto;
    width: 96%;
    top: unset;
    left: unset;
    background: unset;
    margin-left: 2%;
  }
`
const Text = styled.div`
    flex-direction: column;
    width: 55%;
    margin-left: 12%;
    position: relative;
    @media screen and (max-width:950px) {
       width: 100%;
    margin-left: unset;
  }
    h1{
    font-style: normal;
font-weight: normal;
font-size: 40px;
line-height: 45px;
@media screen and (max-width:1300px) {
   font-size: 30px;
  }
  @media screen and (max-width:950px) {
 font-size: 20px;
 line-height: 30px;
  }
    }
    span{
    font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 15px;
 @media screen and (max-width:950px) {
 font-size: 18px;
  }
    }
`
const ThreadBottom = styled.div`
   background: url(/threadBottom.svg) no-repeat;
width: 80rem;
height: 256px;
background-size: contain;
position: absolute;
z-index: 1;
right: 0;
bottom: 30px;
@media screen and (max-width:1300px) {
   left:20%;
  }
   @media screen and (max-width:950px) {
  display:none;
  }
`
const Title = styled.div`
margin-left:10%;
@media screen and (max-width:950px) {
  margin-left:2%;
  }

`
const Form = styled.div`
position:relative;
width:320px;
@media screen and (max-width:950px) {
      width: 96%;
    margin-left: 2%;
    margin-top: 40px;
  }
`
export default function  Appeal({locale,contacts,menu,appeals}){
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const parsedMenu = ParcMenu(menu)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [reason, setReason] = useState('')
    const dispatch = useDispatch()


    const registerOnEvent = async (event) => {
        event.preventDefault()
        if ( name && lastName  && phone && reason ){
            if (phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
                sendWordpress()
                await sendAppeal( name,lastName,reason,phone )
            }
          else {
                dispatch(ShowAlert(leftComment.errors.wrongPhoneNumber[locale], 'error'))
            }

        }
        else {
            dispatch(ShowAlert(leftComment.errors.emptyFields[locale], 'error'))
        }
    }
    const content =
        `
        <h1>Звернення</h1>
        <ul>
        <li>ім'я: ${name}</li>
        <li>прізвище: ${lastName}</li>
          <li>телефон: ${phone}</li>
        <li>причина звернення: ${reason}</li>
        <li>id: ${Math.random() + Math.random()}</li>
        <ul/>
        `
    let [ sendWordpress, { data, error, loading }] = useMutation( SEND_COMMENT, {
        variables: {
            input:{
                commentOn: 16688,
                content:content
            }
        },
        onCompleted: () => {
            if ( !error ) {
                setName('')
                setLastName('')
                dispatch(ShowAlert(leftComment.sent[locale],'success'))
            }
        },
        onError: ( error ) => {
            if ( error ) {
                setName('')
                setLastName('')
                dispatch(ShowAlert(leftComment.sent[locale],'success'))
            }
        }
    } )


    return(
        <MainLayout databaseId={16688} contacts={contacts} menu={parsedMenu}>
            <Global >
                <Title>
                    <TitleForComponent text={appeal.appeal[locale]}/>
                </Title>
                <Content>
                    <PaperPlane/>
                    <ThreadTop/>
                    <GrayBackground>
                        <Text>
                            <h1>{appeal.questions[locale]}</h1>
                            <span>{appeal.writeUs[locale]}</span>
                        </Text>
                    </GrayBackground>
                    <Form>
                        <InputStyled value={name}   text={appeal.name[locale]} onChange={e => setName(e.target.value)}  width='100%'/>
                        <InputStyled  value={lastName}  text={appeal.lastName[locale]} onChange={e => setLastName(e.target.value)}  width='100%'/>
                        <InputStyled  value={lastName}  text={appeal.phoneNumber[locale]} onChange={e => setPhone(e.target.value)}  width='100%'/>
                        <Label>
                            {appeal.reason[locale]}
                        </Label>
                        <Select  style={{marginBottom:'20px'}} onChange={e => setReason(e.target.value)}>
                            <option hidden disabled selected value> </option>
                            {appeals?.map(less=>
                                <option key={less.appealsText} value={less.appealsText}>{less.appealsText}</option>
                            )}
                        </Select>
                        <SendButton
                            sentText={leftComment.sent[locale]}
                            sendText={leftComment.send[locale]}
                            errorText={leftComment.sent[locale]}
                            error={error}
                            done={data}
                            loading={loading}
                            click={registerOnEvent}
                            />
                    </Form>
                    <ThreadBottom/>
                </Content>
            </Global>
        </MainLayout>
    )
}

export async function getStaticProps({locale}) {

    const uri = locale === "EN" ? "/en/glavnaya-english/" : locale === "RU" ? "/ru/glavnaya-2/"  : "/"
    const contactsUri = locale === "EN" ? "/en/contacts/" : locale === "RU" ? "/ru/kontakty/" : "/kontakti/"
    const location = locale === "EN" ? "HEADER_MENU___EN" : locale === "RU" ? "HEADER_MENU___RU" : "HEADER_MENU"

    const {data} = await client.query({
        query: GET_MENU_AND_CONTACTS,
        variables: {
            location,
            contactsUri,
            uri
        }
    })
    return {
        props: {
            locale,
            appeals:data?.appeals?.mainPageFields?.appeals ? data.appeals.mainPageFields.appeals : [],
            contacts: data?.contacts?.contactsFields ? data.contacts.contactsFields : [],
            menu: data?.menuItems?.nodes || [],
        },
        revalidate: 1
    }
}