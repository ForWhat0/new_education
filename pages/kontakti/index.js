/*
import client from "../../src/apollo/client"
import {HomePageLayout} from "../../src/components/layouts/homePageLayout"
import LAST_EVENTS_AND_LAST_NEWS_QUERY from "../../src/queries/get-all-data-for-home-page"
import {ParcMenu} from "../../src/components/hooks/hooks";
import {TitleForComponent} from "../../src/components/titleForComponent/title";
import React from "react";
import {LinkIcon} from "../../src/components/headers/headerStyledElements";
import styled from "styled-components";
import {device} from "../../src/components/deviceSizes/deviceSizes";
import {MainLayout} from "../../src/components/layouts/mainLayout";

const Global = styled.div`
width:80%;
margin-left:10%;
`
const Info = styled.div`
margin-top:50px;
z-index:5;
div{
    display: flex;
    align-items: center;
    margin-bottom:30px;
}
strong{
margin-right:10px;
}
`
const Map = styled.div`
background:url(/map.svg) no-repeat;
position: absolute;
    top: 0;
    right: 0;
    width: 700px;
    height: 500px;
     @media screen and (max-width:1300px) {
 width:80%;
 margin-left:10%;
 position:relative;
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
export default function Home({menu}) {

    const parsedMenu = ParcMenu(menu)

    return (
        <MainLayout
            /!* facebook={mainPageFields.facebook}
             telegram={mainPageFields.telegram}
             gmail={mainPageFields.gmail}*!/
            menu={parsedMenu}
        >
            <Global>
                <TitleForComponent text="Контакти"/>
                <Content>
                    <Info>
                        <div>
                            <LinkIcon  className="fa fa-paper-plane" aria-hidden="true"/>
                            <strong>
                                Телефон/факс
                            </strong>
                            <span>
                           +38 (044) 520-17-00
                        </span>
                        </div>
                        <div>
                            <LinkIcon  className="fa fa-paper-plane" aria-hidden="true"/>
                            <strong>
                                Адреса:
                            </strong>
                            <span>
                          вулиця Кудряшова, 12/14, місто Київ, 03035, Україна
                        </span>
                        </div>
                        <div>
                            <LinkIcon  className="fa fa-paper-plane" aria-hidden="true"/>
                            <strong>
                                Електронна пошта:
                            </strong>
                            <span>
                         monitoring.kyiv@gmail.com
                        </span>
                        </div>
                        <div>
                            <LinkIcon  className="fa fa-paper-plane" aria-hidden="true"/>
                            <LinkIcon  className="fa fa-paper-plane" aria-hidden="true"/>
                        </div>
                    </Info>
                    <Map/>
                </Content>
            </Global>
        </MainLayout>
    )
}
export async function getStaticProps(){
    const { data } = await client.query( {
        query: LAST_EVENTS_AND_LAST_NEWS_QUERY,
        variables: {
            uri,
            language:locale,
            location,
            contactsUri
        }
    } )

    return {
        props: {
            menu:data?.menuItems?.nodes ? data.menuItems.nodes : [],
        },
        revalidate: 1
    }
}
*/
