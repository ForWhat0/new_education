import React from "react"
import {Provider} from 'react-redux'
import {createWrapper} from 'next-redux-wrapper'
import store from "../src/redux/store/store"
import '../styles/globals.css'
import '../styles/calendar.css'
import '../styles/button.scss'
import 'swiper/swiper.scss'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {ApolloProvider} from "@apollo/client";
import client from "../src/apollo/client";
import {ApolloProvider as ApolloHooksProvider} from "react-apollo-hooks/lib/ApolloContext";
import Head from "next/head";
import Link from 'next/link'
import { useRouter } from 'next/router'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
    const router = useRouter()
  return (
      <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
      <Provider store={store}>
          <Head>
              <link
                  rel="stylesheet"
                  href="/fonts/e-Ukraine_font/e-Ukraine-Regular.ttf"
              />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
              <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/plugins/CSSPlugin.min.js"></script>
              <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/easing/EasePack.min.js"></script>
              <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/TweenLite.min.js"></script>
              <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TimelineLite.min.js"></script>
          </Head>
            <Component {...pageProps} />
      </Provider>
          </ApolloHooksProvider>
      </ApolloProvider>
  )
}

const makeStore = ()=> store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)
