import Head from 'next/head'
import {StyledLeftComment} from "../leftComment/leftComment"
import { useDispatch, useSelector} from "react-redux"
import Menu from "../burgerMenu/menu";
import {useEffect, useRef} from 'react';

import {
    useOnClickOutside,
    WindowDimensionsOffVisuallyImpaired
} from '../hooks/hooks';
import {actionClickBurger, OnchangeInputSearchNews} from "../../redux/actions/actions";

import {PageFooter} from "../footer/footer";
import {StyledRegisterZNO} from "../leftComment/registerOnZNO";
import {Element} from "react-scroll";


import NewsWrapper from "../news/newsWrapper";
import StyledLoader from "../loader/loader";
import {LoaderContainer} from "../../../pages/calendar";
import { NewsLsi} from "../../Lsi/lsi";
import {useRouter} from "next/router";
import {Container} from "../../../pages/news";
import {RouterLink} from "../routerLink/routerLink";
import { Modal } from "../modal/modal";
import {BubbleBg} from "../bubbleBg/bubbleBg";



export  const Layout = ({showLinks,databaseId,contacts,menu,hideLeftComponent,children , header,showZNORegister}) => {
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    const router = useRouter()
    const scrollingToElement = router.asPath.substring(1,2) === '#'
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

    WindowDimensionsOffVisuallyImpaired()
    useEffect(()=>{
        dispatch(OnchangeInputSearchNews(''))
    },[pathname])

    return (
        <>
            <Head>
                <link rel="icon" sizes="10x10" href={contacts?.iconSite?.sourceUrl} />
                <meta name="description" content={contacts?.descrSite} />
                <title>{contacts?.titleSite}</title>
            </Head>

            <Modal/>

                <div  ref={node}>
                    {header}
                    <Menu menu={menu}/>
                </div>
            {
                !visuallyImpairedMode && <BubbleBg/>
            }
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
                              <LoaderContainer>
                                  <h2>{NewsLsi.notExist[locale]}</h2>
                                  <h3
                                      onClick={()=>dispatch(OnchangeInputSearchNews(''))}
                                      style={{borderBottom:'1px solid',paddingBottom:'10px',display: 'inline',cursor:'pointer'}}
                                  >
                                      {NewsLsi.cleanInput[locale]}
                                  </h3>
                              </LoaderContainer>

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
         #__next {
              overflow: ${!scrollingToElement ? 'hidden' : 'unset'};
              height:100%;
              width:100%;
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
