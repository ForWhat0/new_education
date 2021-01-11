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
            <Component {...pageProps} />
      </Provider>
          </ApolloHooksProvider>
      </ApolloProvider>
  )
}

const makeStore = ()=> store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)
