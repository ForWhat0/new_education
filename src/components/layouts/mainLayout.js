import {Layout} from "./layout"
import React from "react"
import MainHeader from "../header/mainHeader"

export function MainLayout({ preview, children }) {
    return <Layout
             preview={preview}
             children={children}
             header={<MainHeader/>}
            />
}