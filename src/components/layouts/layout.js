import Head from "next/head";
import client from "../../apollo/client"
import { ApolloProvider } from "@apollo/client"
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import {StyledLeftComment} from "../leftComment/leftComment"
import {useDispatch, useSelector} from "react-redux"
import {Alert} from "../alert/alert"
import Menu from "../burgerMenu/menu";
import React, { useState, useRef } from 'react';
import { useOnClickOutside } from '../hooks/hooks';
import {actionClickBurger} from "../../redux/actions/actions";


export  const Layout = ({children , header}) => {
    const node = useRef();
    const dispatch = useDispatch()
    const {menuBurgerIsOpen} = useSelector(state=>state.app)
    useOnClickOutside(node,  () => menuBurgerIsOpen === true  &&  dispatch(actionClickBurger()));
    const {alert} = useSelector(state=>state.app)
    return (
            <ApolloProvider client={client}>
                <ApolloHooksProvider client={client}>
                    <Head>
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                        <title>Woocommerce React Theme</title>
                    </Head>
                    <div  ref={node}>
                        {header}
                        <Menu/>
                    </div>
                    {alert && <Alert/>}
                    {children}
                    <StyledLeftComment/>
                 </ApolloHooksProvider>
            </ApolloProvider>
    );
};

export default Layout;
