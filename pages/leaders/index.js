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
  }
`;

const RestContainer = styled.div`
  background: rgba(157, 157, 157, 0.08);
  padding: 10px;

  @media screen and ${device.tablet} {
    overflow-x: auto;
  }
`;

const RestGlobalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5%;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "unset")};

  @media screen and ${device.laptop} {
    grid-template-columns: 1fr;
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

        {leaders.length > 0 &&
          leaders.map(
            (item, index) =>
              item?.leaderField?.isDirector && (
                <RestGlobalContainer>
                  <RestContainer>
                    <TextImage key={index + item.leaderField.nameLastname}>
                      {item?.featuredImage?.node?.sourceUrl && (
                        <img
                          alt="Leader"
                          src={item.featuredImage.node.sourceUrl}
                        />
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
                  </RestContainer>
                </RestGlobalContainer>
              )
          )}

        <RestGlobalContainer marginTop="5%">
          {leaders.length > 0 &&
            leaders.map(
              (item, index) =>
                !item?.leaderField?.isDirector && (
                  <RestContainer>
                    <TextImage key={index + item.leaderField.nameLastname}>
                      {item?.featuredImage?.node?.sourceUrl && (
                        <img
                          alt="Leader"
                          src={item.featuredImage.node.sourceUrl}
                        />
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
                  </RestContainer>
                )
            )}
        </RestGlobalContainer>
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
