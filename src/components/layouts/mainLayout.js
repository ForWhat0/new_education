import { Layout } from "./layout";
import MainHeader from "../headers/mainHeader";

export function MainLayout({
  databaseId,
  contacts,
  showZNORegister,
  hideLeftComponent,
  menu,
  children,
  routerLinkTitle,
  routerScroll,
}) {
  return (
    <Layout
      routerScroll={routerScroll}
      showLinks={true}
      databaseId={databaseId}
      menu={menu}
      contacts={contacts}
      showZNORegister={showZNORegister}
      hideLeftComponent={hideLeftComponent}
      header={<MainHeader menu={menu} />}
      routerLinkTitle={routerLinkTitle}
      children={children}
    />
  );
}
