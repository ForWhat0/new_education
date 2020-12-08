import {Layout} from "./layout"
import LargeHeader from "../headers/largeHeader";

export function HomePageLayout({  children ,facebook , telegram ,gmail}) {
    return <Layout
        header={<LargeHeader facebook={facebook} telegram={telegram} gmail={gmail}/>}
        children={children}
    />
}