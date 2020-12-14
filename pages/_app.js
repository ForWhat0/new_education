import React from "react"
import {Provider} from 'react-redux'
import {createWrapper} from 'next-redux-wrapper'
import store from "../src/redux/store/store"
import '../styles/globals.css'
import 'swiper/swiper.scss'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
            <Component {...pageProps} />
      </Provider>
  )
}

const makeStore = ()=> store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)
