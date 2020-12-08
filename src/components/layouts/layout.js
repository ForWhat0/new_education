import Head from 'next/head'
import React from "react"

export function Layout({ preview, children , header}) {
    return (
        <>
            <Head>
                <title>Posts Page | Test Blog</title>
                <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            </Head>
            <main>
                {header}
                {children}
            </main>
        </>
    )
}