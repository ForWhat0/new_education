import {useMutation} from "@apollo/client"
import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {InputStyled} from "../input/input"
import {SendButton} from "../sendButton/sendButton"
import SEND_COMMENT from "../../mutations/sendComment"
import {ShowAlert} from "../../redux/actions/actions"
import StyledLoader from '../loader/loader'
import {
    Container,
    ContainerWrapper,
    Flex,
    IconBackgroundZNO,
    InputsFields, LoaderContainer, Select,
    SubTitle,
    Text,
    Title, Label, TextZno
} from "./leftCommentStyLedComponents"
import {PageFooter} from "../footer/footer";
import {useRouter} from "next/router";
import {leftCommentZno} from "../../Lsi/lsi";

export const StyledRegisterZNO =({databaseId,showZNORegister,contacts,menu,display,src,align})=>{
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const router = useRouter()
    const locale = router.locale
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')
    const [learn, setLearn] = useState('')
    const content =
        `
        <ul>
         <li>${name}</li>
          <li>${email}</li>
        <li>${phone}</li>
         <li>${learn}</li>
          <li>${comment}</li>
        <uk/>
        `
    let [ send, {  data, error, loading }] = useMutation( SEND_COMMENT, {
        variables: {
            input:{
                commentOn: databaseId,
                author: name,
                authorEmail:email,
                content:content
            }
        },
        onCompleted: () => {
            if ( !error ) {
                dispatch(ShowAlert('ok','success'))
            }
        },
        onError: ( error ) => {
            if ( error ) {
                dispatch(ShowAlert(error.graphQLErrors[ 0 ].message,'error'))
            }
        }
    } )

    const handleSendClick = () => {
        if (name && phone && email && comment && learn){
            if ( phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)){
                if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/im)){
                    if (comment.length > 6 ){
                        send()
                    }
                    else{
                        dispatch(ShowAlert(leftCommentZno.errors.commentShort[locale], 'error'))
                    }
                }
                else {
                    dispatch(ShowAlert(leftCommentZno.errors.wrongEmail[locale], 'error'))
                }
            }
            else {
                dispatch(ShowAlert(leftCommentZno.errors.wrongPhoneNumber[locale], 'error'))
            }
        }
        else{
            dispatch(ShowAlert(leftCommentZno.errors.emptyFields[locale], 'error'))
        }

    }
    return (
        <Container background={!visuallyImpairedModeWhiteTheme ? '#1D1D1B' : '#F2F9FD'} src={src} display={display} align={align}>
            <Title>
                {showZNORegister.title}
            </Title>
            <ContainerWrapper>
                <TextZno>
                    <IconBackgroundZNO background={!visuallyImpairedModeWhiteTheme ? 'leftCommentZnoWhiteicon.svg' : 'registerZnoIcon.svg'} />
                    <SubTitle>
                        {leftCommentZno.writeUs[locale]}
                    </SubTitle>
                </TextZno>
                <InputsFields>
                    <Flex>
                        <InputStyled text= {leftCommentZno.name[locale]} onChange={e => setName(e.target.value)}   width='47.5%'/>
                        <InputStyled text= {leftCommentZno.phoneNumber[locale]} onChange={e => setPhone(e.target.value)}  width='47.5%'/>
                    </Flex>
                    <InputStyled maxlength='40' text= {leftCommentZno.email[locale]} onChange={e => setEmail(e.target.value)} width='100%'/>
                    <InputStyled maxlength='100' text= {leftCommentZno.comment[locale]} onChange={e => setComment(e.target.value)} width='100%'/>
                    <Label>
                        {leftCommentZno.choose[locale]}
                    </Label>
                    <Select onChange={e => setLearn(e.target.value)}>
                        <option hidden disabled selected value> </option>
                        {showZNORegister.learn?.map(less=>
                        <option key={less.nameLearn} value={less.nameLearn}>{less.nameLearn}</option>
                        )}
                    </Select>
                    <LoaderContainer>
                        {loading &&  <StyledLoader/>}
                        <SendButton
                            error={error}
                            done={data}
                            sentText={leftCommentZno.sent[locale]}
                            sendText={leftCommentZno.send[locale]}
                            errorText={leftCommentZno.error[locale]}
                            loading={loading}
                            click={handleSendClick}/>
                    </LoaderContainer>
                </InputsFields>
            </ContainerWrapper>
            <PageFooter contacts={contacts} menu={menu}/>
        </Container>
    )
}