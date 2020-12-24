
export function CalendarLayout({  children }) {
    return <Layout
        menu={menu}
        header={<LargeHeader menu={menu} facebook={facebook} telegram={telegram} gmail={gmail}/>}
        children={children}
    />
}