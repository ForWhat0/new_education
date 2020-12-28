import {Layout} from "./layout"
import MainHeader from "../headers/mainHeader"

export function MainLayout({contacts,showZNORegister, hideLeftComponent , menu, children}) {

    return <Layout
        menu={menu}
        contacts={contacts}
        showZNORegister={showZNORegister}
        hideLeftComponent={hideLeftComponent}
        header={<MainHeader menu={menu} />}
        children={children}
    />
}