import {Layout} from "./layout"
import LargeHeader from "../headers/largeHeader";

export function HomePageLayout({ menu, children ,contacts,title}) {
    return <Layout
        menu={menu}
        contacts={contacts}
        header={<LargeHeader menu={menu} contacts={contacts} title={title}/>}
        children={children}
    />
}