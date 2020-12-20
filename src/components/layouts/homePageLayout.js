import {Layout} from "./layout"
import LargeHeader from "../headers/largeHeader";

export function HomePageLayout({ menu, children ,facebook , telegram ,gmail}) {
    return <Layout
        menu={menu}
        header={<LargeHeader menu={menu} facebook={facebook} telegram={telegram} gmail={gmail}/>}
        children={children}
    />
}