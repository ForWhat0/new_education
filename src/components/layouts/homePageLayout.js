import {Layout} from "./layout"
import React from "react"
import HomePageHeader from "../header/homePageHeader"

export function HomePageLayout({ preview, children }) {
    return <Layout
        preview={preview}
        children={children}
        header={<HomePageHeader/>}
    />
}