import Head from "next/head";
import {StyledLeftComment} from "../leftComment/leftComment"
import {useDispatch, useSelector} from "react-redux"
import {Alert} from "../alert/alert"
import Menu from "../burgerMenu/menu";
import React, {useRef} from 'react';
import { useOnClickOutside } from '../hooks/hooks';
import {actionClickBurger} from "../../redux/actions/actions";
import {ModalRegisterEvent} from "../modal/modalRegistOnEvent";
import {PageFooter} from "../footer/footer";
import {StyledRegisterZNO} from "../leftComment/registerOnZNO";
import {Element} from "react-scroll";


export  const Layout = ({contacts,menu,hideLeftComponent,children , header,showZNORegister}) => {

   /* useEffect(() => {
        delay()
    }, [])
    function delay(){
        'use strict'

        //bubbles!
        bubbling()

        //bubbly backgrounds with minor customizations
        function bubbling(){
            Bubblee()
        }// bubbling end


        //setInterval(function(){ bubbling()}, 900)
    }
     const Bubblee = function (config) {
        const c = config || {};
        const r = () => Math.random();
        const canvas = c.canvas || document.createElement("canvas");
        let width = canvas.width;
        let height = canvas.height;
        if (canvas.parentNode === null) {
            canvas.setAttribute("style", "background:transparent;position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            document.body.appendChild(canvas);
        }
        const context = canvas.getContext("2d");
        context.shadowColor = "#fff";
        context.shadowBlur = 4;

        const nrBubbles = c.bubbles || Math.floor((width + height) * 0.02);
        const bubbles = [];
        for (let i = 0; i < nrBubbles; i++) {
            bubbles.push({
                f: (() => `hsla(${Math.random() * 50}, 100%, 50%, .3)`).call(), // fillStyle
                x: r() * width, // x-position
                y: r() * height, // y-position
                r: (c.radiusFunc || (() => 4 + r() * width / 25)).call(), // radius
                a: (c.angleFunc || (() => r() * Math.PI * 2)).call(), // angle
                v: (c.velocityFunc || (() => 0.1 + r() * 0.5)).call() // velocity
            });
        }
        (function draw() {
            if (canvas.parentNode === null) {
                return cancelAnimationFrame(draw)
            }
            if (c.animate !== false) {
                requestAnimationFrame(draw);
            }

            context.globalCompositeOperation = "source-over";
            bubbles.forEach(bubble => {
                context.beginPath();
                context.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
                context.fillStyle = bubble.f;
                context.fill();

                bubble.x += Math.cos(bubble.a) * bubble.v;
                bubble.y += Math.sin(bubble.a) * bubble.v;
                if (bubble.x - bubble.r > width) {
                    bubble.x = -bubble.r;
                }
                if (bubble.x + bubble.r < 0) {
                    bubble.x = width + bubble.r;
                }
                if (bubble.y - bubble.r > height) {
                    bubble.y = -bubble.r;
                }
                if (bubble.y + bubble.r < 0) {
                    bubble.y = height + bubble.r;
                }
            });
        })();
    };*/
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
                    <script src="https://cdn.jsdelivr.net/npm/bubbly-bg@1.0.0/dist/bubbly-bg.js"></script>

                    <div  ref={node}>
                        {header}
                        <Menu menu={menu}/>
                        <ModalRegisterEvent/>
                    </div>
                    {alert && <Alert/>}
                    {children}

               {
                   showZNORegister ?
                       <Element name="#RegisterZNO" className="element">
                           <StyledRegisterZNO contacts={contacts} menu={menu}/>
                       </Element>
                       :
                    !hideLeftComponent ?  <StyledLeftComment contacts={contacts} menu={menu}/> :
                        <PageFooter contacts={contacts} menu={menu}/>
               }
                </>
    );
};

export default Layout;
