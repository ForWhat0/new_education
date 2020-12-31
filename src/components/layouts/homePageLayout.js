import {Layout} from "./layout"
import LargeHeader from "../headers/largeHeader";

export function HomePageLayout({ databaseId,menu, children ,contacts,title}) {
    return <Layout
        databaseId={databaseId}
        menu={menu}
        contacts={contacts}
        header={<LargeHeader menu={menu} contacts={contacts} title={title}/>}
        children={children}
    />
}