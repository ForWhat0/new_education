
import {StyledLeftComment} from "../leftComment/leftComment"
import {Provider, useDispatch, useSelector} from "react-redux"
import {Alert} from "../alert/alert"
import Menu from "../burgerMenu/menu";
import React, {useEffect, useRef} from 'react';

import {
    main,
    ShowWindowDimensions,
    useOnClickOutside,
    useWindowSize,
    WindowDimensionsOffVisuallyImpaired
} from '../hooks/hooks';
import {actionClickBurger, OnchangeInputSearchNews} from "../../redux/actions/actions";

import {PageFooter} from "../footer/footer";
import {StyledRegisterZNO} from "../leftComment/registerOnZNO";
import {Element} from "react-scroll";

import styled from 'styled-components'
import NewsWrapper from "../news/newsWrapper";
import StyledLoader from "../loader/loader";
import {LoaderContainer} from "../../../pages/calendar";
import {calendarLsi, NewsLsi} from "../../Lsi/lsi";
import {useRouter} from "next/router";
import {Container} from "../../../pages/news";
import {RouterLink} from "../routerLink/routerLink";
import { Modal } from "../modal/modal";



export  const Layout = ({showLinks,databaseId,contacts,menu,hideLeftComponent,children , header,showZNORegister}) => {
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    const router = useRouter()
    const locale = router.locale
    const pathname = router.pathname
    const dispatch = useDispatch()
    const {visuallyImpairedModeWhiteTheme} = useSelector(state=>state.app)
    const {loading} = useSelector(state=>state.app)
    const {inputNewsByTitle} = useSelector(state=>state.news)
    const {newsByTitle} = useSelector(state=>state.news)
    const {fontSize} = useSelector(state=>state.app)

    const node = useRef();
    const {menuBurgerIsOpen} = useSelector(state=>state.app)
    useOnClickOutside(node,  () => menuBurgerIsOpen === true  &&  dispatch(actionClickBurger()));
    const {alert} = useSelector(state=>state.app)

    WindowDimensionsOffVisuallyImpaired()
    useEffect(()=>{
        dispatch(OnchangeInputSearchNews(''))
    },[pathname])

    return (
        <>


            {alert && <Alert/>}
            <Modal/>

                <div  ref={node}>
                    {header}
                    <Menu menu={menu}/>
                </div>
            {
                showLinks && <RouterLink/>
            }

                {
                    inputNewsByTitle.length ?

                      loading ?
                          <LoaderContainer>
                              <StyledLoader/>
                          </LoaderContainer>
                      :
                          newsByTitle.length ?
                              <Container>
                                  <LoaderContainer>
                                      <h2 style={{margin: "0.67rem 0 0 0"}}>
                                          {NewsLsi.result[locale]}
                                      </h2>
                                  </LoaderContainer>
                                  <NewsWrapper posts={newsByTitle}/>
                              </Container>
                   :
                              <div style={{textAlign:'center',margin:'50px 0 50px 0'}}>
                                  <h1>{NewsLsi.notExist[locale]}</h1>
                                  <h2
                                      style={{borderBottom:'1px solid',paddingBottom:'10px',display: 'inline',cursor:'pointer'}}
                                      onClick={()=>dispatch(OnchangeInputSearchNews(''))}
                                  >
                                      {NewsLsi.cleanInput[locale]}
                                  </h2>
                              </div>

                    :
                        children

                }
                {
                    showZNORegister ?
                        <Element name="#RegisterZNO" className="element">
                            <StyledRegisterZNO databaseId={databaseId} showZNORegister={showZNORegister} contacts={contacts} menu={menu}/>
                        </Element>
                        :
                        !hideLeftComponent ?  <StyledLeftComment databaseId={databaseId} contacts={contacts} menu={menu}/> :
                            <PageFooter contacts={contacts} menu={menu}/>
                }



            <style jsx global>{`
        body {
             color:${!visuallyImpairedModeWhiteTheme && 'white'};
             background:${!visuallyImpairedModeWhiteTheme && '#1D1D1B'};
        }
        h1 {
          font-size: ${fontSize === 'medium' ? '42px' : fontSize === 'large' ? '44px' : 'off'};
        }
         div,span,ul,li,a,label,p {
          font-size: ${fontSize === 'medium' ? '17px' : fontSize === 'large' ? '18px' : 'off'};
        }
      `}</style>
        </>
    );
};

export default Layout;
