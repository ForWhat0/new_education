import {Layout} from "./layout"
import MainHeader from "../headers/mainHeader"

export function MainLayout({showZNORegister, hideLeftComponent , menu, children ,facebook , telegram ,gmail}) {

    return <Layout
        menu={menu}
        showZNORegister={showZNORegister}
        hideLeftComponent={hideLeftComponent}
        header={<MainHeader menu={menu} />}
        children={children}
    />
}