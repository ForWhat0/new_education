import {Layout} from "./layout"
import MainHeader from "../headers/mainHeader"

export function MainLayout({ hideLeftComponent , menu, children ,facebook , telegram ,gmail}) {

    return <Layout
        menu={menu}
        hideLeftComponent={hideLeftComponent}
        header={<MainHeader menu={menu} />}
        children={children}
    />
}