import Head from "next/head";
import {StyledLeftComment} from "../leftComment/leftComment"
import {useDispatch, useSelector} from "react-redux"
import {Alert} from "../alert/alert"
import Menu from "../burgerMenu/menu";
import React, {useEffect, useRef} from 'react';
import { useOnClickOutside } from '../hooks/hooks';
import {actionClickBurger} from "../../redux/actions/actions";
import {ModalRegisterEvent} from "../modal/modalRegistOnEvent";
import {PageFooter} from "../footer/footer";
import {StyledRegisterZNO} from "../leftComment/registerOnZNO";
import {Element} from "react-scroll";
import {bubbling} from '../bubbling/bubbling'
import styled from 'styled-components'
export  const Layout = ({databaseId,contacts,menu,hideLeftComponent,children , header,showZNORegister}) => {
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const {fontSize} = useSelector(state=>state.app)
    const h1 = fontSize === 'medium' ? '42px' : fontSize === 'large' ? '44px' : '40px'
    const div = fontSize === 'medium' ? '18px' : fontSize === 'large' ? '20px' : 'unset'
     const Global = styled.div`
     color:${props=>props.color};
     background:${props=>props.background};
     `
  /*  bubbling(visuallyImpairedMode)*/
    const node = useRef();
    const dispatch = useDispatch()
    const {menuBurgerIsOpen} = useSelector(state=>state.app)
    useOnClickOutside(node,  () => menuBurgerIsOpen === true  &&  dispatch(actionClickBurger()));
    const {alert} = useSelector(state=>state.app)

    return (
           <>
                    <Head>
                        <link
                            rel="stylesheet"
                            href="/fonts/e-Ukraine_font/e-Ukraine-Regular.ttf"
                        />
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                        <title>Woocommerce React Theme</title>
                    </Head>

               {alert && <Alert/>}
               <Global
                   h1={h1}
                   div={div}
                   color={!visuallyImpairedModeWhiteTheme && 'white'}
                   background={!visuallyImpairedModeWhiteTheme && '#1D1D1B'}

               >
                   <div  ref={node}>
                       {header}
                       <Menu menu={menu}/>
                       <ModalRegisterEvent/>
                   </div>

                   {children}
                   {
                       showZNORegister ?
                           <Element name="#RegisterZNO" className="element">
                               <StyledRegisterZNO databaseId={databaseId} showZNORegister={showZNORegister} contacts={contacts} menu={menu}/>
                           </Element>
                           :
                           !hideLeftComponent ?  <StyledLeftComment databaseId={databaseId} contacts={contacts} menu={menu}/> :
                               <PageFooter contacts={contacts} menu={menu}/>
                   }
               </Global>



                </>
    );
};

export default Layout;
