import client from "../../src/apollo/client";
import { ParcMenu } from "../../src/components/hooks/hooks";
import { TitleForComponent } from "../../src/components/titleForComponent/title";
import styled from "styled-components";
import { MainLayout } from "../../src/components/layouts/mainLayout";
import { leadersLsi } from "../../src/Lsi/lsi";
import { FieldTextIcon } from "../../src/components/field-text-icon/field-text-icon";
import { device } from "../../src/components/deviceSizes/deviceSizes";
import { PdfComponent } from "../../src/components/pdfComponent/pdfComponent";
import GET_LEADERS from "../../src/queries/get_leaders";

const Global = styled.div`
  width: 80%;
  margin-left: 10%;
  margin-bottom: 100px;
  @media screen and (max-width: 700px) {
    width: 93.6%;
    margin-left: 3.2%;
    margin-bottom: 40px;
  }
`;

const Container = styled.div`
  background: rgba(157, 157, 157, 0.08);
  max-width: 50%;
  padding: 10px;
  overflow-x: auto;
  @media screen and (max-width: 1300px) {
    max-width: 80%;
  }
  @media screen and ${device.laptop} {
    max-width: 100%;
  }
`;

const TextImage = styled.div`
  display: flex;
  flex-direction: row;

  img {
    height: auto;
    width: auto;
    max-width: 195px;
    max-height: 250px;
    border-radius: 30px;
    box-shadow: 0px 0px 20px rgb(29 29 27 / 20%);
  }
  @media screen and ${device.tablet} {
    flex-direction: column;
  }
`;

const Text = styled.div`
  padding: 20px 0 0 17px;
  display: flex;
  flex-direction: column;
  @media screen and ${device.tablet} {
    padding: 20px 0 0 0;
  }
`;
const Name = styled.span`
  font-size: 20px;
  line-height: 25px;
  padding-bottom: 10px;
  font-weight: 400;
`;
const Space = styled.div`
  padding: 25px 0;
`;
export default function Home({ menu, contacts, locale, leaders }) {
  const parsedMenu = ParcMenu(menu);
  return (
    <MainLayout
      databaseId={contacts.databaseId}
      contacts={contacts}
      menu={parsedMenu}
    >
      <Global>
        <TitleForComponent
          marginBottom="40px"
          borderBottom="unset"
          text={leadersLsi.title[locale]}
        />
        <Container>
          {leaders.length > 0 &&
            leaders.map((item, index) => (
              <Space>
                <TextImage key={index + item.leaderField.nameLastname}>
                  {item?.featuredImage?.node?.sourceUrl && (
                    <img alt="Leader" src={item.featuredImage.node.sourceUrl} />
                  )}
                  <Text>
                    <Name>{item.leaderField.nameLastname}</Name>
                    <FieldTextIcon content={item.leaderField?.position} />
                    {item?.leaderField?.phoneNum && (
                      <FieldTextIcon
                        icon="/phone.svg"
                        content={item.leaderField.phoneNum}
                      />
                    )}
                    {item?.leaderField?.gmail && (
                      <FieldTextIcon
                        icon="/gmailIcon.svg"
                        content={item.leaderField.gmail}
                      />
                    )}
                  </Text>
                </TextImage>
                {item?.leaderField?.fileBio?.mediaItemUrl && (
                  <PdfComponent
                    href={item.leaderField.fileBio.mediaItemUrl}
                    text={item.leaderField.bioInformation}
                    size={item.leaderField.fileBio.fileSize}
                    locale={locale}
                  />
                )}
              </Space>
            ))}
        </Container>
      </Global>
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
    query: GET_LEADERS,
    variables: {
      location,
      contactsUri,
      language: locale,
    },
  });

  return {
    props: {
      locale,
      contacts: data?.contacts?.contactsFields
        ? data.contacts.contactsFields
        : [],
      menu: data?.menuItems?.nodes ? data.menuItems.nodes : [],
      leaders: data?.leader?.nodes ? data.leader.nodes : [],
    },
    revalidate: 30,
  };
}
