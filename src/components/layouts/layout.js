import Head from "next/head";
import client from "../../apollo/client"
import Router from "next/router"
import NProgress from "nprogress"
import { ApolloProvider } from "@apollo/client"
import {StyledLeftComment} from "../leftComment/leftComment"
import {useSelector} from "react-redux"
import {Alert} from "../alert/alert"


Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export  const Layout = ({children , header}) => {
    const {alert} = useSelector(state=>state.app)
    return (
            <ApolloProvider client={client}>
                    <Head>
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                        <title>Woocommerce React Theme</title>
                    </Head>
                    {header}
                    {alert && <Alert/>}
                    {children}
                    <StyledLeftComment />

            </ApolloProvider>
    );
};

export default Layout;
