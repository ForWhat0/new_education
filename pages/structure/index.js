import client from "../../src/apollo/client";
import { ParcMenu } from "../../src/components/hooks/hooks";
import { TitleForComponent } from "../../src/components/titleForComponent/title";
import styled from "styled-components";
import { MainLayout } from "../../src/components/layouts/mainLayout";
import GET_STRUCTURE from "../../src/queries/get_structure";
import { contactsLsi, structureLsi } from "../../src/Lsi/lsi";
import { TreeSelect } from "../../src/components/tree-selector/tree-selector";
import { FieldTextIcon } from "../../src/components/field-text-icon/field-text-icon";

const Container = styled.div`
  width: 80%;
  margin-left: 10%;
  margin-bottom: 100px;
  @media screen and (max-width: 700px) {
    width: 93.6%;
    margin-left: 3.2%;
  }
`;

const Info = styled.div`
  z-index: 3;
  position: relative;
  strong {
    margin-right: 10px;
  }
`;
const CircleBackground = styled.div`
  height: 100px;
  z-index: -1;
  background: rgba(0, 174, 239, 0.08);
  width: 100px;
  left: -5px;
  bottom: -20px;
  border-radius: 50%;
  position: absolute;
`;
export default function Home({ menu, contacts, locale, structure }) {
  const parsedMenu = ParcMenu(menu);
  return (
    <MainLayout
      databaseId={contacts.databaseId}
      contacts={contacts}
      menu={parsedMenu}
    >
      <Container>
        <TitleForComponent
          marginBottom="40px"
          borderBottom="unset"
          text={structureLsi.title[locale]}
        />
        {structure &&
          structure.map((item) => (
            <TreeSelect title={item.nameDepartment}>
              <Info>
                <CircleBackground />
                <FieldTextIcon title={item.position} content={item.nameLast} />
                <FieldTextIcon
                  icon="/gmailIcon.svg"
                  title={contactsLsi.email[locale]}
                  content={item.gmailDepartment}
                />
              </Info>
            </TreeSelect>
          ))}
      </Container>
    </MainLayout>
  );
}
export async function getStaticProps({ locale }) {
  const contactsUri =
    locale === "EN"
      ? "/en/contacts/"
      : locale === "RU"
      ? "/ru/kontakty/"
      : "/kontakti/";
  const location =
    locale === "EN"
      ? "HEADER_MENU___EN"
      : locale === "RU"
      ? "HEADER_MENU___RU"
      : "HEADER_MENU";

  const { data } = await client.query({
    query: GET_STRUCTURE,
    variables: {
      location,
      contactsUri,
      language: locale,
    },
  });

  return {
    props: {
      locale,
      structure: data?.structure?.nodes[0]?.structureField?.department
        ? data.structure.nodes[0].structureField.department
        : [],
      contacts: data?.contacts?.contactsFields
        ? data.contacts.contactsFields
        : [],
      menu: data?.menuItems?.nodes ? data.menuItems.nodes : [],
    },
    revalidate: 30,
  };
}
