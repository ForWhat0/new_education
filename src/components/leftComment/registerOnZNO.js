import {useMutation} from "@apollo/client"
import React, {useState} from "react"
import {useDispatch} from "react-redux"
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
    Title,Label
} from "./leftCommentStyLedComponents"
import {PageFooter} from "../footer/footer";

export const StyledRegisterZNO =({menu,display,src,align})=>{
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')

    let [ send, {  data, error, loading }] = useMutation( SEND_COMMENT, {
        variables: {
            input:{
                commentOn: 1,
                author: name,
                authorEmail:email,
                content:phone+comment
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
        if (name && phone && email && comment){
            if ( phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)){
                if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/im)){
                    if (comment.length > 6 ){
                        send()
                    }
                    else{
                        dispatch(ShowAlert('comment too short','error'))
                    }
                }
                else {
                    dispatch(ShowAlert('wrong email','error'))
                }
            }
            else {
                dispatch(ShowAlert('wrong phone','error'))
            }
        }
        else{
            dispatch(ShowAlert('zapowni','error'))
        }

    }
    return (
        <Container src={src} display={display} align={align}>
            <Title>
                Маєш пропозицію?
            </Title>
            <ContainerWrapper>
                <Text>
                    <IconBackgroundZNO />
                    <SubTitle>
                        Напиши нам!
                    </SubTitle>
                </Text>
                <InputsFields>
                    <Flex>
                        <InputStyled text="Прізвище та ім'я" onChange={e => setName(e.target.value)}   width='47.5%'/>
                        <InputStyled text="Телефон" onChange={e => setPhone(e.target.value)}  width='47.5%'/>
                    </Flex>
                    <InputStyled text="Email" onChange={e => setEmail(e.target.value)} width='100%'/>
                    <InputStyled text="Коментар" onChange={e => setComment(e.target.value)} width='100%'/>
                    <Label>
                        Оберіть предмет(и)
                    </Label>
                    <Select>
                        <option hidden disabled selected value> </option>
                        <option>українська мова</option>
                        <option>українська література</option>
                        <option>математика</option>
                        <option>історія України</option>
                        <option>англійська мова</option>
                        <option>біологія</option>
                        <option>біологія</option>
                        <option>хімія</option>
                    </Select>
                    <LoaderContainer>
                        {loading &&  <StyledLoader/>}
                        <SendButton error={error} done={data} loading={loading} click={handleSendClick}/>
                    </LoaderContainer>
                </InputsFields>
            </ContainerWrapper>
            <PageFooter menu={menu}/>
        </Container>
    )
}