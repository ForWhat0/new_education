import {Layout} from "./layout"
import MainHeader from "../headers/mainHeader"

export function MainLayout({databaseId,contacts,showZNORegister, hideLeftComponent , menu, children}) {

    return <Layout
        showLinks={true}
        databaseId={databaseId}
        menu={menu}
        contacts={contacts}
        showZNORegister={showZNORegister}
        hideLeftComponent={hideLeftComponent}
        header={<MainHeader menu={menu} />}
        children={children}
    />
}